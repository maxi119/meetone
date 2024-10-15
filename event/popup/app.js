

const App = () => {
    const [count, setCount] = React.useState(0);

    const increment = () => {
        setCount(prevCount => prevCount + 1);
    };

    return (
        <div class="mainbg">
            <Title/>

            <h1>簡單的 React 頁面</h1>
            <p>計數: {count}</p>
            <button onClick={increment}>增加</button>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));