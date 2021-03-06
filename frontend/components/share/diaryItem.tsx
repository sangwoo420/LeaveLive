import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { BACKEND_IMAGE_URL } from "../../api";
import { Key, useEffect, useState } from "react";
import { getUserDiary } from "../../api/user";
import styled from 'styled-components';
import { flexCenter } from "../../styles/Basic";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
interface IType {
    nickname: string;
    picPath: string;
}

const DiaryItem = ({content, date, diaryId, picPath, userId, tag, tagFunction}: any) => {
    const picPathList = picPath.split(",");
    const [userData, setUserData] = useState<IType | any>({});
    const [btn, setBtn] = useState(0);
    const textLength = content.length;
    const tags = tag.split(",");

    useEffect(()=>{
        getUserDiary(
            userId,
            ({ data }: any) => {setUserData(data)},
            (error: Error): any => console.log(error)
        )
    },[])

    return (
        <div style={{marginBottom: '2vh'}}>
            <Carousel showThumbs={false}>
                {picPathList.map((pic: any, idx: Key | null | undefined)=>(
                    <div key={idx}>
                        <img 
                            src={`${BACKEND_IMAGE_URL}/${pic}`}
                            width="100%" height={220}
                            style={{objectFit: 'contain'}}
                        />
                    </div>
                ))}
            </Carousel>
            <div>
                <Profile>
                    <img src={`${BACKEND_IMAGE_URL}/${userData.picPath}`} height={30} width={30} style={{marginLeft:'3vw'}} />
                    <div style={{paddingLeft:'3vw', fontSize: '1rem', fontWeight: 'bold'}}>{userData.nickname}</div>
                    <div style={{marginLeft: 'auto', paddingRight: '5vw'}}>{date}</div>
                </Profile>
                <Main>
                    <TagContainer>
                        {tags.map((tag: any, idx: any)=>{
                            return <TagIcon key={idx} onClick={()=>{tagFunction(tag)}}><span>{tag}</span></TagIcon>
                        })}
                    </TagContainer>
                
                    {textLength > 50 ?
                        btn === 0 ?
                            <>
                                <Text>
                                    {content.split("\n").map((line: any, idx: any)=>{
                                        return (
                                            <span key={idx}>
                                                {line}
                                                <br />
                                            </span>
                                        )
                                    })}
                                </Text>
                                <div onClick={()=>(setBtn(1))}><ArrowDropDownIcon /></div> 
                            </> :
                            <>
                                <div>
                                    {content.split("\n").map((line: any, idx: any)=>{
                                        return (
                                            <span key={idx}>
                                                {line}
                                                <br />
                                            </span>
                                        )
                                    })}
                                </div>
                                <div onClick={()=>(setBtn(0))}><ArrowDropUpIcon /></div>
                            </> :
                        <div>{content}</div>
                    }
                </Main>
            </div>
        </div>
    )
};

const TagIcon = styled.div`
${flexCenter}
background-color: #dffff4;
border-radius: 20px;
padding: 0.3rem 1rem;
font-size: 0.8rem;
margin-right: 0.5rem;
margin-bottom: 0.8rem;
& > span {
  margin-right: 0.3rem;
  margin-bottom: 2px;
}

&:hover {
  cursor: pointer;
}
`;

const TagContainer = styled.div`
  ${flexCenter}
  flex-wrap: wrap;
  justify-content: start;
`;

const Profile = styled.div`
    display: flex;
    padding-left: 2vw;
    padding-top: 2vw;
    align-items: center;
`;
const Main = styled.div`
    display: grid;
    padding-left: 5vw;
    padding-right: 5vw;
    margin: 2vh;
    // padding-bottom: 1vh;
`;
const Text = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; 
  -webkit-box-orient: vertical; 
  word-wrap:break-word; 
  line-height: 1.2em; 
  height: 3.6em;
`;

export default DiaryItem;