function Card({bgcolor, txtcolor, header, title, text, body, status}){
    function classes(){
        const bg  = bgcolor ? ' bg-' + bgcolor : ' ';
        const txt = txtcolor ? ' text-' + txtcolor: ' txt-white';
        return 'card-mb-3 mx-auto mt-4 rounded' + bg + txt;
    }

    return(
        <div className={classes()} style={{maxWidth: "18rem"}}>
            <div className="card-header text-center"><b>{header}</b></div>
            <div className="card-body">
                <form>
                {title && (<h5 className="card-title">{title}</h5>)}
                {text && (<p className="card-text">{text}</p>)}
                {body}
                {status && (<div id='createStatus'>{status}</div>)}
                </form>
            </div>
        </div>
    );
}

export default Card;