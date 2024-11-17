
function CollectionBook (){

    const maxMenCount = 10;
    const maxWemonCount = 10;

    const getSpecificParam = (paramName) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(paramName);
    };

    const pInfo = getSpecificParam( "person" )
    let personalCode = 'sdfsdf';
    // 生成 QR Code 圖片
    const generateQRCode = () => {
        const qrCode = document.getElementById("qr-code")
        let text = personalCode;
        qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=${encodeURIComponent(text)}`;
    
    };
    setTimeout(generateQRCode, 1000);

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

                            {pInfo ? <p>{pInfo}</p> : <p className="personalinfo col">輸入個人資訊, 可在快閃活動中透過簡介來認識別人</p>}
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
                <p className="collectbook title2">收集到的卡片  1/10</p>
                <div className="row">
                    <div className="col-md-1 coll_book_no">1</div>
                    <div className="col-md-4 coll_book_title">萬華劉得華</div>
                    <div className="col-md-2 coll_book_item">JSTP</div>
                </div>
            </div>
        </div>
    )
}