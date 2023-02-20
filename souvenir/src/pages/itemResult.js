import {Card, Row, Typography} from "antd";
import React, {useEffect, useState} from "react";
import Image from 'next/image'
import {useRouter} from 'next/router'
import {doc, getDoc, getFirestore} from "firebase/firestore";
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

const itemResult = () => {
    const [description, setDescription] = useState("");
    const [result, setResult] = useState()
    const router = useRouter();
    const {phoneNumber, name} = router.query;

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    useEffect(() => {
        const getData = async () => {
            const docRef = doc(db, "login", "UHGsPPaf4Q5YHjOCMFFP");
            const docSnap = await getDoc(docRef);
            setResult(docSnap.get(phoneNumber).check);
        }
        getData().catch(console.error);
        switch (parseInt(result)) {
            case 1 :
                setDescription("1. 뉴발란스 4종 팬티 L 사이즈");
                break;
            case 2 :
                setDescription("2. 길라델리 초콜렛 2개");
                break;
            case 3 :
                setDescription("3. 마이클 코스 3종팬티 M 사이즈");
                break;
            case 4 :
                setDescription("4. 타미힐 피거 지갑 1종");
                break;
            case 5 :
                setDescription("5. 남성용 + 로션 세트");
                break;
            case 6 :
                setDescription("6. 타미힐 피거 흰반팔티셔츠 XL");
                break;
            case 7 :
                setDescription("7. 할리우드 기념 자석");
                break;
            case 8 :
                setDescription("8. LA 기념 자석");
                break;
            case 9 :
                setDescription("9. 할리우드 기념 자석");
                break;
            case 10 :
                setDescription("10. 유튜브 열쇠고리");
                break;
            case 11 :
                setDescription("11. 유튜브 키보드 스티커");
                break;
            case 12 :
                setDescription("12. 구글 노트(빨강)");
                break;
            case 13 :
                setDescription("13. 구글 노트(블루)");
                break;
            case 14 :
                setDescription("14. 구글 노트");
                break;
            default:
                break;
        }
    })

    return <div>
        <Row justify={'center'}>
            <Title>{name}님 상품 결과</Title>
        </Row>

        <Row justify={'center'}>
            <br/>
            <Card title="상품 결과는?" bordered={false} style={{width: "100%", textAlign: "center"}}>
                <Image
                    src={`/images/${result}.jpg`}
                    alt="Picture of the author"
                    width={"300"}
                    height={"300"}
                    sizes={"fill"}
                />
                <Row justify={"center"}>
                    <b>{description}</b>
                </Row>
            </Card>
            <br/>
        </Row>
    </div>
}

export default itemResult;