// 테스트 하는 페이지
import type { NextPage } from "next";
import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import {useRouter} from 'next/router';
import styled from 'styled-components';

const Container = styled.div`
  // border: 1px solid;
  height: 100vh;
  width: 100vw;
  // justify-content: center;
  padding-top: 30vh;
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 20px;
`;
interface Props {
  step?: number;
  setStep: Dispatch<SetStateAction<number>>;
  // onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Test: NextPage = () => {

  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    console.log(step);
  },[step])

  return (
    <Container>
      {step === 0 && <Test1 setStep={setStep}></Test1> }
      {step === 1 && <Test2 setStep={setStep}></Test2> }
      {step === 2 && <Test3 setStep={setStep}></Test3> }
      {step === 3 && <Test4 /> }
      {step === 4 && <Test5 /> }
      {step === 5 && <Test6 /> }
      {step === 6 && <Test7 /> }
    </Container>
  )
};

const Test1: NextPage<Props> = ({setStep}) => {
  const router = useRouter();

  return(
    <>
      <div style={{textAlign:'center', marginBottom:'45vh'}}>
        <div>자연에서 쉬고싶다.</div>
        <div onClick={()=>(setStep(1))}>Yes</div>
        <div onClick={()=>(setStep(2))}>No</div>
      </div>
      <div style={{fontSize: '15px'}} onClick={()=>{router.push('/search/map')}}>skip</div>
    </>
  )
}

const Test2: NextPage<Props> = ({setStep}) => {
  const router = useRouter();
  return (
    <>
      <div style={{textAlign:'center', marginBottom:'45vh'}}>
        <div onClick={()=>(setStep(3))}>산이 좋다.</div>
        <div onClick={()=>(setStep(4))}>바다가 좋다.</div>
      </div>
      <div style={{fontSize: '15px'}} onClick={()=>{router.push('/search/map')}}>skip</div>
    </>
  )
}

const Test3: NextPage<Props> = ({setStep}) => {
  const router = useRouter();
  return (
    <>
      <div style={{textAlign:'center', marginBottom:'45vh'}}>
        <div onClick={()=>(setStep(5))}>도시가 좋다.</div>
        <div onClick={()=>(setStep(6))}>조용한 휴양지가 좋다.</div>
      </div>
      <div style={{fontSize: '15px'}} onClick={()=>{router.push('/search/map')}}>skip</div>
    </>
  )
}

const Test4: NextPage = () => {
  const router = useRouter();

  const handleClick_5 = (e: any) => {
    e.preventDefault();
    router.push({
      pathname: '/test/result',
      query: { region: '전라북도 전주' },
    })
  }

  const handleClick_6 = (e: any) => {
    e.preventDefault();
    router.push({
      pathname: '/test/result',
      query: { region: '충청남도 논산' },
    })
  }

  return (
    <>
      <div style={{textAlign:'center', marginBottom:'45vh'}}>
        <div>여행은 역시 맛집탐방이다.</div>
        <div onClick={handleClick_5}>Yes</div>
        <div onClick={handleClick_6}>No</div>
      </div>
      <div style={{fontSize: '15px'}} onClick={()=>{router.push('/search/map')}}>skip</div>
    </>
  )
}

const Test5: NextPage = () => {
  const router = useRouter();

  const handleClick_7 = (e: any) => {
    e.preventDefault();
    router.push({
      pathname: '/test/result',
      query: { region: '경상북도 포항' },
    })
  }

  const handleClick_8 = (e: any) => {
    e.preventDefault();
    router.push({
      pathname: '/test/result',
      query: { region: '제주도' },
    })
  }
  return (
    <>
      <div style={{textAlign:'center', marginBottom:'45vh'}}>
        <div>이색적이고 특별한 곳이 좋다.</div>
        <div onClick={handleClick_7}>Yes</div>
        <div onClick={handleClick_8}>No</div>
      </div>
      <div style={{fontSize: '15px'}} onClick={()=>{router.push('/search/map')}}>skip</div>
    </>
  )
}

const Test6: NextPage = () => {
  const router = useRouter();

  const handleClick_9 = (e: any) => {
    e.preventDefault();
    router.push({
      pathname: '/test/result',
      query: { region: '강원도 강릉' },
    })
  }

  const handleClick_10 = (e: any) => {
    e.preventDefault();
    router.push({
      pathname: '/test/result',
      query: { region: '경상남도 거제' },
    })
  }
  return (
    <>
      <div style={{textAlign:'center', marginBottom:'45vh'}}>
        <div onClick={handleClick_9}>역사 유적 탐방이 좋다.</div>
        <div onClick={handleClick_10}>유명한 곳이 좋다.</div>
      </div>
      <div style={{fontSize: '15px'}} onClick={()=>{router.push('/search/map')}}>skip</div>
    </>
  )
}

const Test7: NextPage = () => {
  const router = useRouter();

  const handleClick_11 = (e: any) => {
    e.preventDefault();
    router.push({
      pathname: '/test/result',
      query: { region: '충청북도 청주' },
    })
  }

  const handleClick_12 = (e: any) => {
    e.preventDefault();
    router.push({
      pathname: '/test/result',
      query: { region: '광주광역시' },
    })
  }
  return (
    <>
      <div style={{textAlign:'center', marginBottom:'45vh'}}>
        <div>수도권기준!</div>
        <div onClick={handleClick_11}>가까운게 좋다.</div>
        <div onClick={handleClick_12}>먼게 좋다.</div>
      </div>
      <div style={{fontSize: '15px'}} onClick={()=>{router.push('/search/map')}}>skip</div>
    </>
  )
}


export default Test;


