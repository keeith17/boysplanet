## 설치 및 실행

```bash
cd app
npm i
npm start
```

```
** axios 예시 **
const test = () =>{
    axios({
        url: "{api주소}/getData?num=1",
        method:"GET",
    }).then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
}
useEffect(()=>{
    test();
}, []);
```

## 프로젝트

올해 초 Mnet에서 방영했던 <Boys Planet> 프로그램의 투표 순위 여론 조사 서비스입니다. 블라인드 투표를 통해 데뷔를 결정하는 오디션 프로그램으로, 투표 순위를 가늠하기 어려웠기 때문에 팬들의 답답함을 해소해 보고자 제작했던 사이트입니다.

## 사용한 skill

FRONT:React.js, javascript, Axios, Figma  
DEPLOY:Aws
