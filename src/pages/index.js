import {Row, Col, Card, Input, Button} from 'antd';
import {Typography} from 'antd';
import React, {useState} from "react";
import {useRouter} from 'next/router'
import Image from 'next/image'

import {collection, doc, getFirestore, setDoc, getDoc, query, where} from "firebase/firestore";
import {initializeApp} from "firebase/app";

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

const Item = ({src,description}) => {
    return <Col span={12} style={{borderBottom:"10px"}}>
        <Row justify={"center"}>
            <Image
                src={src}
                alt="Picture of the author"
                width={"140"}
                height={"140"}
                sizes={"fill"}
            />
        </Row>
        <Row justify={"center"}>
            <b>{description}</b>
        </Row>
    </Col>
}

const home = () => {

    const [phoneNumber, setPhoneNumber] = useState(null);
    const onChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    }

    const router = useRouter()

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const onClickCheck = async () => {
        if (phoneNumber) {
            const docRef = doc(db, "login", "UHGsPPaf4Q5YHjOCMFFP");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                if (docSnap.get(phoneNumber)) {
                    // //번호랑 같이 페이지 넘기고 상품 확인 할 수 있도록 선택
                    if(docSnap.get(phoneNumber).check === -1) {
                        router.push(`/itemCheck?phoneNumber=${phoneNumber}&&name=${docSnap.get(phoneNumber).name}`)
                    }
                    else{
                        router.push(`/itemResult?phoneNumber=${phoneNumber}&&name=${docSnap.get(phoneNumber).name}`)
                    }
                } else {
                    alert("해당 번호가 리스트에 없습니다. 관리자에게 문의주세요!")
                }
            } else {
                alert("준비중입니다")
            }
        } else {
            alert("핸드폰번호를 입력하세요!")
        }
    }
    return <div>
        <Row justify={'center'}>
            <Title>기념품 확인 페이지</Title>
        </Row>

        <Row justify={'center'}>
            <br/>
            <Card title="상품 확인" bordered={false} style={{width: "100%", textAlign: "center"}}>
                <Input placeholder="핸드폰번호(ex : 010XXXXXXXX)" style={{marginBottom: "10px"}} type={"number"}
                       onChange={onChangePhoneNumber}/>
                <Button type="primary" style={{width: "100%"}} onClick={onClickCheck}>확 인</Button>
            </Card>
            <br/>
        </Row>

        <Card title="상품목록" bordered={false} style={{width: "100%", textAlign: "center"}}>
            <Row style={{marginBottom:"10px"}}>
                <Item src={"/images/1.jpg"} description={"1. 뉴발란스 4종 팬티 L 사이즈"}></Item>
                <Item src={"/images/2.jpg"} description={"2. 길라델리 초콜렛 1개"}></Item>
            </Row>
            <Row style={{marginBottom:"10px"}}>
                <Item src={"/images/3.jpg"} description={"3. 마이클 코스 3종팬티 M 사이즈"}></Item>
                <Item src={"/images/4.jpg"} description={"4. 타미힐 피거 지갑 1종"}></Item>
            </Row>
            <Row style={{marginBottom:"10px"}}>
                <Item src={"/images/5.jpg"} description={"5. 남성용 + 로션 세트"}></Item>
                <Item src={"/images/6.jpg"} description={"6. 타미힐 피거 흰반팔티셔츠 XL"}></Item>
            </Row>
            <Row style={{marginBottom:"10px"}}>
                <Item src={"/images/7.jpg"} description={"7. 할리우드 기념 자석"}></Item>
                <Item src={"/images/8.jpg"} description={"8. LA 기념 자석"}></Item>
            </Row>
            <Row style={{marginBottom:"10px"}}>
                <Item src={"/images/9.jpg"} description={"9. 할리우드 기념 자석"}></Item>
                <Item src={"/images/10.jpg"} description={"10. 유튜브 열쇠고리"}></Item>
            </Row>
            <Row style={{marginBottom:"10px"}}>
                <Item src={"/images/11.jpg"} description={"11. 유튜브 키보드 스티커"}></Item>
                <Item src={"/images/12.jpg"} description={"12. 구글 노트(빨강)"}></Item>
            </Row>
            <Row style={{marginBottom:"1px"}}>
                <Item src={"/images/13.jpg"} description={"13. 구글 노트(블루)"}></Item>
                <Item src={"/images/14.jpg"} description={"14. 구글 노트"}></Item>
            </Row>
        </Card>
    </div>
}

export default home;