import "../stylesKiosk/buttonStyle.css"



const MuistotkartallaLogo = (props) =>{

    return(
        <button className="logoButton" onClick={props.onClick}>
            <p className="textButton">{props.title}</p>
        </button>
    )
}

export default MuistotkartallaLogo;


//This component is used in MapCointainerKiosk.js inside of MapCointainer component
//this is made to render a buton with the website's name and the option to asing an 
//click event, in this case  it will be clickAbout.  