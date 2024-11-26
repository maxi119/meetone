
function _uuid() {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
      d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function CollectionBook (){

    const maxMenCount = 10;
    const maxWemonCount = 10;

    const getSpecificParam = (paramName) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(paramName);
    };
    let personCode = localStorage.getItem("personalCode");
    if( personCode === null ){
        personCode = _uuid();
        localStorage.setItem("personalCode", personCode);
    }
    let personName = localStorage.getItem("personName") ?? '';
    let mbti = localStorage.getItem("mbtiResult") ?? '';

    let personInfo = {
        uid : personCode,
        title: personName,
        mbti: mbti,
    }
    let friendList = localStorage.getItem('collect_book')??"[]";
    friendList = JSON.parse(friendList);

    function friendContnet(){
        function friendItem(friend, idx){
            return(
                <div className="row friend">    
                    <div className="col-md-1 coll_book_no">
                        <p>{idx}</p>
                    </div>
                    <div className="col-md-4 coll_book_title">
                        <p>{friend.title ?? '訪客'}</p>
                    </div>
                    <div className="col-md-2 coll_book_item">
                        <p>{friend.mbti}</p>
                    </div>
        
                </div>
            )
        }
        let ret = [];
        for( let i = 0; i < friendList.length; i++ ){
            ret.push(friendItem(friendList[i], i +2));
        }
        return ret;
    }

    function addOther(){
        const otherJson = getSpecificParam( "person" );
        console.log('get data', otherJson);
        if( otherJson !== null ){
            const otherInfo = JSON.parse(otherJson);
            let existInfo = false;
            for( let i = 0; i < friendList.length; i++ ){
                if( friendList[i].uid === otherInfo.uid ){
                    existInfo = friendList[i];
                    break;
                 }
            }
            console.log( "friendList", friendList );
            if( existInfo === false ){
                friendList.push(otherInfo);
            }else{
                existInfo.title = otherInfo.title;
                existInfo.mbti = otherInfo.mbti;
                
            }
            let jss = JSON.stringify(friendList);
            localStorage.setItem('collect_book', jss);
            // window.location.href = `/meetone/event/popup/collection_book.html`;
        }
    }

    addOther();
    // 生成 QR Code 圖片
    const generateQRCode = () => {
        let personalCode =  JSON.stringify(personInfo);
        const qrCode = document.getElementById("qr-code")
        let text = `https://${window.location.host}/meetone/event/popup/index.html?person=${personalCode}`;
        qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=${encodeURIComponent(text)}`;
    
    };
    setTimeout(generateQRCode, 500);
    
    let tdebounce = 0;
    let [intro, setIntro ] = React.useState(personInfo.name ?? '');
    function titleChanged(e){
        let introV = e.target.value;
        // console.log('onchange',e);
        // personInfo.intro = introV;
        // let jss = JSON.stringify(personInfo);
        clearTimeout(tdebounce);
        tdebounce = setTimeout(()=>{
            personInfo.name = introV;
            // console.log('creating qr', personInfo);
            generateQRCode();
        }, 2000);
        localStorage.setItem('personName', introV);
        setIntro(introV);
        // console.log( 'afeterset', intro, e.target.value )
    }

    // let intro = personInfo.name ?? '';
    return (
        <div className="container md-4">
            <div className="card collections">

                <p>我的卡片</p>
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col">
                            <p>個人簡介</p>
                                </div>
                            <div className="row">

                             {/* <p className="personalinfo col">輸入個人資訊, 可在快閃活動中透過簡介來認識別人</p> */}
                             <input type='text' className="personalinfo col"  onChange={(e)=>{titleChanged(e)}} value={intro} placeholder="輸入個人資訊, 可在快閃活動中透過簡介來認識別人" />

                            </div>
                        </div>
                    </div>
                    <div className="col"><img id="qr-code" className="qrpreivew" alt="QR Code" /></div>
                </div>
                <p/>
                <div className="col"> <p className="personalinfo_hint">透過掃瞄 QR 來收集其它人的卡片</p></div>
            </div>
      
            <div className="card collectbook">

                掃描上方QR Code 收集好友卡片
                <p className="collectbook title2">收集到的卡片  {friendList.length+1}/10</p>
                <div className="row friend">
                    <div className="col-md-1 coll_book_no">1</div>
                    <div className="col-md-4 coll_book_title">萬華劉得華</div>
                    <div className="col-md-2 coll_book_item">JSTP</div>
                </div>
                {friendContnet()}
            </div>
        </div>
    )
}