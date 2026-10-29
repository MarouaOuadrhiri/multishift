import V2Site from './v2/V2Site';
export default function App(){return <V2Site pathname={typeof window==='undefined'?'/':window.location.pathname}/>}
