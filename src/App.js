import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, Center, Container, Heading, SimpleGrid, Text, chakra } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';

export default function App() {
  const [minutes, setMinutes] = useState(0);
  const [second, setSecond] = useState(0);
  const [hours, setHours] = useState(0);
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
    if(minutes === 60){
        setHours(hours + 1);
        setMinutes(0);
      if(second >= 59){
        setHours(hours + 1);
        setMinutes(0);
        setSecond(0);
      }
    }
    if(minutes > 0){
      if(second < 0){
        setMinutes(minutes - 1);
        setSecond(59);
      }
    }
    if(minutes < 0){
      if(second < 0){
        setHours(hours - 1);
        setMinutes(59);
        setSecond(59);
      }
    }
  }, [hours, isRunning, minutes, second]);

  const reset = () => {
    setSecond(0);
    setMinutes(0);
    setHours(0);
    setStatus(0);
    setIsRunning(false);
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

  const decsec = () => {
    setSecond(second - 1);
  }

  const decmin= () => {
    setMinutes(minutes - 1);
  }

  const dechours = () => {
    setHours(hours - 1);
  }

  return (
    <Container centerContent marginTop="10%">
      <Heading>
      <Text fontSize="4xl">Countdown Timer</Text>
      {isRunning && hours === 0 && minutes === 0 && second === 0 && (<Center><Text fontSize="xl">Times Up!!!</Text></Center>)}
      </Heading>
      <SimpleGrid columns={3} spacing={30} marginTop="20%">
        {!isRunning && (<TriangleUpIcon onClick={inchours}/>)}
        {!isRunning && (<TriangleUpIcon onClick={incmin}/>)}
        {!isRunning && (<TriangleUpIcon onClick={incsec}/>)}
        <p>{hours}</p>
        <p>{minutes}</p>
        <p>{second}</p>
        {!isRunning && (hours > 0) && (<TriangleDownIcon onClick={dechours}/>)}
        {!isRunning && (hours === 0) && (<TriangleDownIcon/>)}
        {!isRunning && (minutes > 0) && (<TriangleDownIcon onClick={decmin}/>)}
        {!isRunning && (minutes === 0) && (<TriangleDownIcon/>)}
        {!isRunning && (second > 0) && (<TriangleDownIcon onClick={decsec}/>)}
        {!isRunning && (second === 0) && (<TriangleDownIcon/>)}
      </SimpleGrid>
      {!isRunning && status === 0 && (<Button onClick={start} marginTop="7%">Start</Button>)}
      <SimpleGrid columns={2} spacing={10} marginTop="7%">
        {!isRunning && status === 1 && (<Button onClick={resume}>Resume</Button>)}
        {!isRunning && status === 1 && (<Button onClick={reset}>Reset</Button>)}
        {isRunning && (hours >= 0) && (minutes >= 0) && (second >= 0) && (<Button onClick={pause}>Pause</Button>)}
        {isRunning && (hours >= 0) && (minutes >= 0) && (second >= 0) && (<Button onClick={reset}>Reset</Button>)}
      </SimpleGrid>
      <Center><chakra.h1 pos="fixed" bottom="0" fontSize="24px">&copy; Faisal Aprianto - 00000042520</chakra.h1></Center>
    </Container>
  );
}