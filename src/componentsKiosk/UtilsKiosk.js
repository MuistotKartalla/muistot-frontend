
import "../stylesKiosk/buttonStyle.css"


const UtilIcon = (props) => {
    return (
        <div>
            {props.icon}
        </div>
    );
}

export const  Utils = (props) => {
    return (
        <div className="utils-containerKiosk">

            <ul className="utils-ulKiosk">
                {props.items.map((element, index) => (
                    <UtilIcon key={index} icon={element} />
                ))}
            </ul>

        </div>
    );
}