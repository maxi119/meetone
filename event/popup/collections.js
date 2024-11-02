
function CollectionBook (){

    const maxMenCount = 10;
    const maxWemonCount = 10;

    const getSpecificParam = (paramName) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(paramName);
    };

    const pInfo = getSpecificParam( "person" )
    
    return (
        <div>
            <h1>卡片收集冊</h1>
            <p>個人簡介</p>
            {pInfo ? <p>{pInfo}</p> : <p>無</p>}
            <p>收集到的卡片  0/10</p>
        </div>
    )
}