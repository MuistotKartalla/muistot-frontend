import "../stylesKiosk/buttonStyle.css"
import iconLOGO from "../resources/logoIcon.png"


const MuistotkartallaLogo = (props) =>{

    return(
       
             <img src={iconLOGO} alt="Logo" className="logoIcon" onClick={props.onClick}/>
           
     
    )
}

export default MuistotkartallaLogo;


//This component is used in MapCointainerKiosk.js inside of MapCointainer component
//this is made to render a buton with the website's name and the option to asing an 
//click event, in this case  it will be clickAbout.  