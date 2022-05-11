import { useCallback, useEffect, useState } from "react";
import styled from 'styled-components';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Router from 'next/router';
import BnbItem from "../../../../components/reservation/bnbitem";
import { likeBnbList, bnbList } from "../../../../api/bnb";
import { listenerCount } from "process";
import Region from "../../../search/[region]";

const StyledTab = styled.div`
  display: flex;
  justify-content: space-between;
  height: 7vh;
  align-items: center;
  background: #60ffc6;
  margin-bottom: 3vh;
  padding-left: 3vw;
  padding-right: 3vw;
`;

const BnbList = () => {
  const region = Router.query.region;
  const [list, setList] = useState([]);
  const [like, setLike] = useState('');

  // console.log(region)

  useEffect(() => {
    likeBnbList(
      null,
      (data: any) => {
        console.log(data.data);
        setLike(data.data);
      }, 
      (error: Error) => console.log(error))
    bnbList(
      region,
      (data: any) => {
        // console.log(data.data);
        setList(data.data);
      },
      (error: Error) => console.log(error)
    )
  }, []);

  return (
    <div style={{marginBottom: '10vh'}}>
      <StyledTab>
        <ArrowBackIosNewIcon onClick={()=>(Router.back())} />
        <div>{region}</div>
        <ArrowBackIosNewIcon sx={{color:'#60ffc6'}}/>
      </StyledTab>
        {list.map((bnb)=>(
            <div key={bnb.id}
                contents={bnb.contents}
                cooking={bnb.cooking}
                garden={bnb.garden}
                loc={bnb.loc}
                onClick={()=>(Router.push(`bnb/${bnb.id}`))}>
              <BnbItem 
                name={bnb.name} 
                contents={bnb.contents} 
                picpath={bnb.picPath}
              />
            </div>
        ))} 
    </div>
  )
};

export default BnbList;
