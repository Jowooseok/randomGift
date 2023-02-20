import {Row, Col, Card, Input, Button} from 'antd';
import {Typography} from 'antd';
import React, {useState} from "react";
import { useRouter } from 'next/router'

//firebase
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";

const {Title} = Typography;

const firebaseConfig = {
    apiKey: "AIzaSyBkFs_bDa_hXYRygEITp86cOyhO9-7nqRc",
    authDomain: "souvenir-a2436.firebaseapp.com",
    projectId: "souvenir-a2436",
    storageBucket: "souvenir-a2436.appspot.com",
    messagingSenderId: "156198257947",
    appId: "1:156198257947:web:4b46c6bd9b6d86d73f3fbe",
    measurementId: "G-5L5ET271RT"
};

const index = () => {
    const [name, setName] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const router = useRouter()

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const onChangeName = (e) =>{
        setName(e.target.value);
    }
    const onChangePhoneNumber = (e) =>{
        setPhoneNumber(e.target.value);
    }
    const onClickLogin = async () => {
        //처음 회원가입시
        if(name && phoneNumber){
            console.log(name,phoneNumber);
            await addDoc(collection(db, "login"), {
                name: name,
                phoneNumber: phoneNumber,
            });
            router.push('/admin')
        }else{
            alert("이름과 핸드폰번호를 입력해주세요")
        }
    }

    return <div>
        <Row justify={'center'}>
            <Title>기념품 확인 페이지</Title>
        </Row>
        <Row justify={'center'}>
            <br/>
            <Card title="로그인" bordered={false} style={{ width: "100%", textAlign:"center"}}>
                <Input placeholder="이름을 입력해주세요" style={{marginBottom:"10px"}} onChange={onChangeName} />
                <Input placeholder="핸드폰번호(ex : 010XXXXXXXX)" style={{marginBottom:"10px"}} onChange={onChangePhoneNumber} />
                <Button type="primary" style={{width:"100%"}} onClick={onClickLogin}>로그인</Button>
            </Card>
            <br/>
        </Row>
    </div>
}

export default index;