function Card(props){
    function classes(){
        const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
        const txt = props.txtcolor ? ' text-' + props.txtcolor: ' txt-white';
        return 'card-mb-3 mx-auto mt-4 rounded' + bg + txt;
    }

    return(
        <div className={classes()} style={{maxWidth: "18rem"}}>
            <div className="card-header text-center"><b>{props.header}</b></div>
            <div className="card-body">
                <form>
                {props.title && (<h5 className="card-title">{props.title}</h5>)}
                {props.text && (<p className="card-text">{props.text}</p>)}
                {props.body}
                {props.status && (<div id='createStatus'>{props.status}</div>)}
                </form>
            </div>
        </div>
    );
}

export default Card;