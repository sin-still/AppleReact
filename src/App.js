/* eslint-disable */
// 워닝 없애주는 기능

import { useEffect, useState } from "react";
import "./App.css";

function App() {
  let post = "강남 우동 맛집";
  let [logo, setLogo] = useState("React BLOG");
  let [title, setTitle] = useState([
    "남자 코트 추천",
    "여자 코드 추천",
    "REACT 독학"
  ]);
  let [good, setGood] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [modalTitle, setModalTitle] = useState(0);
  let [ input, setInput ] = useState('');
  //[a, b] a = state 저장한 자료 b = state 를 변경할 때 도와주는 함수

  //변수와 state 의 차이점
  //변수는 변경이 일어났을 때 랜더링이 일어나지않음.
  //state 는 변경이 되었을 때 재랜더링이 일어난다.
  //때문에 자주 변경이 될 거 같은 곳에 state를 사용.

  //let num = [1, 2];
  //let [a, c] = [1, 2;
  //Destructuring(디스럭쳐링 문법): arry안에 요소를 빼주는 문법
  useEffect(()=>{

  },[title])
  function titleFn() {
    let newTitle = [...title];
    newTitle[0] =
      newTitle[0] !== "여자 코트 추천" ? "여자 코트 추천" : "남자 코트 추천";
    setTitle(newTitle);
    // [...tltie] < 새로운 스테이트를 생성하는거임.
    //원본데이터를 수정하는 방식은 옳지 않다. 때문에 카피본을 만들어 수정한다.

    //let title[0] = '여자코트추천' 이 안되는이유
    //const copyTitle = title ; 같은 이유.

    //consol.log(title == copyTitle)  = true  // 레퍼런스 데이터타입.

    //state 변경함수의 특징 = 기존 state == 신규state 의 경우 변경이 안된다.
    //array/object 특징
    //let arr = [1,2,3];
    // arr , obj 담은 변수엔 화살표만 저장된다.
    //ex) 저장공간에 있는 1,2,3이 어딧는지 알려주는 화살표가 저장되어 있는 것.
  }
  // state 를 변경할 땐 set함수를 활용해서 ( ) 안에 집어넣는다.

  function sort() {
    let copy = [...title];
    copy.sort();
    setTitle(copy);
    console.log(title);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{ color: "red", fontSize: "16px" }}>{logo}</h4>
      </div>
      <button onClick={titleFn}>제목 변경</button>
      <button onClick={sort}>정렬</button>
      {/* <div className='list'>
        <h4>{ title[0] } <span onClick={ goodFn } >🧡</span> { good } </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className='list'>
        <h4>{ title[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className='list'>
        <h4 onClick={()=>modal ==true ? setModal(false): setModal(true)}>{ title[2] }</h4>
        {
          //모달 스위치 : 모달 state = true 라면 false로 아니라면 true로.
        }
        <p>2월 17일 발행</p>
      </div> */}

      {
        title.map(function (item, i) {
          function goodFn(e) {
            e.stopPropagation()
            //이벤트 버블링을 막아주는 함수.
            let copygood = [...good];
            copygood[i] = copygood[i] + 1;
            setGood(copygood);
            
          }
          function deleteItem() {
            const newTitle = title.filter(( _, index) => index !== i);
            setTitle(newTitle);
          }
          return (
            <div className="list" key={i} >
              <h4
                onClick={() =>{
                  // modal == true? setModal(false) : setModal(true);
                  // 좀더 간단히 하면 ! not 연산자를 활용하여 바꿀 수 있다.
                  setModal(!modal);
                  setModalTitle(i);
                }}
              >
                {title[i]} 
                <span onClick={goodFn}>🧡</span> {good[i]}{" "}
              </h4>
              <p>2월 17일 발행</p>
              <button onClick={deleteItem}>삭제하기</button>
            </div>
          );
        })
        // map() 함수
        /* 
        [1,2,3].map(function(a){
        console.log(a)
        return '123123123'
        }) 

        1. array 자료 갯수만큼 함수안의 코드를 실행해준다
        2. 함수의 파라미터는 array 안에 있던 자료다
        3. return 적은 값은 array로 담아준다

        */
      }
      
      <input type="text" value={input} onChange={(e)=>{setInput(e.target.value); console.log(e.target.value)}} />
      <button onClick={()=>{
        
        setTitle([...title,input]) 
        console.log(title)
        setInput('');
      }}>추가</button>

      {
        modal === true ? <Modal title={title} modalTitle={modalTitle} titleFn={titleFn} item={title.map}></Modal> : null
        //if문은 여기서 사용불가능. 대신 삼항 조건 연산자를 사용한다.
        //프롭스를 받아올 땐 작명과 스테이트이름을 적어 사용한다.
      }
      
    </div>
  );
}

/* 
1.function 만들기
//컴포넌트를 만들때는 첫글자 대문자.
  2.return() 안에 html 담기.
  3.<함수명 /> 사용
*/

/* 
1. 반복적인 html 축약할 때. 
2. 큰페이지 틀
3. 자주 변경되는 것들

*/

function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.title[props.modalTitle]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={props.titleFn}>글수정</button>
    </div>
  );
}
export default App;
