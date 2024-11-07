
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
        <div className="container mt-4">
            <div className="row">
                <div className="col"> 專屬屬序號</div>
                <div className=" col"><img id="qr-code" className="qrpreivew" alt="QR Code" /></div>
            </div>
            <p/>
            <p>個人簡介</p>
            {pInfo ? <p>{pInfo}</p> : <p className="personalinfo_hint">輸入個人資訊, 可在快閃活動中透過簡介來認識別人</p>}
            掃描上方QR Code 收集好友卡片
            <p>收集到的卡片  0/10</p>
        </div>
    )
}