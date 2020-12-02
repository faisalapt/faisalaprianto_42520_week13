import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, Center, Container, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';

export default function App() {
  const [minutes, setMinutes] = useState(58);
  const [second, setSecond] = useState(20);
  const [hours, setHours] = useState(1);
  const [startTime, setStartTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    if(isRunning){
      const interval = setInterval(() => {
        if(second > 0){
          setSecond(second - 1);
        }
        if(second === 0){
          if(minutes === 0){
            clearInterval(interval);
          }else{
            setMinutes(minutes - 1);
            setSecond(59);
          }
        }
        if(second === 0){
          if(minutes === 0){
            if(hours === 0){
              clearInterval(interval);
            }else{
              setHours(hours - 1);
              setMinutes(59);
              setSecond(59);
            }
          }
        }
      }, 1000);
      return () => clearInterval(interval);
    }
    if (second === 60){
      setMinutes(minutes + 1);
      setSecond(0);
    }
    if(second === 60){
      if(minutes === 59){
        setHours(hours + 1);
        setMinutes(0);
        setSecond(0);
      }
    }
  });

  const reset = () => {
    setSecond(0);
    setMinutes(0);
    setHours(0);
    setStatus(0);
  }

  const start = () => {
    setIsRunning(true);
    setStatus(1);
    
  }

  const pause = () => {
    setIsRunning(false);
  }

  const resume = () => {
    setIsRunning(true);
  }

  const incsec = () => {
    setSecond(second + 1);
  }

  const incmin = () => {
    setMinutes(minutes + 1);
  }

  const inchours = () =>{
    setHours(hours + 1);
  }

  return (
    <Container centerContent marginTop="10%">
      <Heading>
      <Text fontSize="6xl">Countdown Timer</Text>
      </Heading>
      <SimpleGrid columns={3} spacing={30}>
        {!isRunning && (<TriangleUpIcon onClick={inchours}/>)}
        {!isRunning && (<TriangleUpIcon onClick={incmin}/>)}
        {!isRunning && (<TriangleUpIcon onClick={incsec}/>)}
        <p>{hours}</p>
        <p>{minutes}</p>
        <p>{second}</p>
        <TriangleDownIcon/>
        <TriangleDownIcon/>
        <TriangleDownIcon/>
      </SimpleGrid>
      {!isRunning && status === 0 && (<Button onClick={start} marginTop="7%">Start</Button>)}
      <SimpleGrid columns={2} spacing={10} marginTop="7%">
        {!isRunning && status === 1 && (<Button onClick={resume}>Resume</Button>)}
        {!isRunning && status === 1 && (<Button onClick={reset}>Reset</Button>)}
        {isRunning && (<Button onClick={pause}>Pause</Button>)}
        {isRunning && (<Button onClick={reset}>Reset</Button>)}
      </SimpleGrid>
    </Container>
  );
}