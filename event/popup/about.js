function AboutPage() {
    return (
        <div className="container-lg">

            <div className="content-section about">
                <h2>關於我們</h2>
       
                <div className="jusitfy-content-md-center row">
                    <div className="aboutfield  col-md-3">平面：</div><div className="col-md-8">君羊、Ayden</div>
                </div>
                <div className="row">
                    <div className="aboutfield col-md-3">視覺：</div><div className="col-md-8">13、Ken、Ayden</div>
                </div>

                <div className="row">
                    <div className="aboutfield col-md-3">攝影：</div><div className="col-md-8">君羊</div>
                </div>
                <div className="row">
                    <div className="aboutfield col-md-3">文案：</div><div className="col-md-8">13、Ken</div>
                </div>
                <div className="row">
                    <div className="aboutfield col-md-3">音樂：</div><div className="col-md-8">冠融</div>
                </div>
                <div className="row">
                    <div className="aboutfield col-md-3">網頁：</div><div className="col-md-8">Maxi</div>
                </div>


            </div>

            <div className="content-section about">
                <h2>關於網頁</h2>

                <p className="txt">這是一個使用 React 和 Bootstrap 建立的網頁。</p>
                <p className="txt">使用 react 程 bootstrap 但不經過 babel 編譯，直接使用 import 引入。</p>
                <p className="txt">使用上有一些限制，例如無法使用 JSX 語法，但可以使用 React 的函式式組件。</p>
                <p className="txt">這樣可以在不 clone 下直接線上編輯 </p>
                <p className="txt">所有資訊皆無遠端存放，這是一個可以離線使用的網頁。</p>
                <p className="txt">版權為本人所有，請勿商業使用。</p>
                <p className="txt">如有問題，請聯絡：maxi.chang@gmail.com</p>
            </div>
        </div>
    );
}