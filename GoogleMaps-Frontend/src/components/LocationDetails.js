import "./styles/LocationDetails.css"

const LocationDetails = (props) => {
    return (
        <div className="card">
            <img src={props.details.photos} alt="not available"></img>
            <h1>{props.details.name}</h1>
            <p className="title">{props.details.address}</p>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            {props.details.phoneNumber !== "" && <p><span style={{ fontWeight: "bold" }}>Phone: </span>{props.details.phoneNumber}</p>}
            {props.details.website !== "" && <p><span style={{ fontWeight: "bold" }}>Website: </span>{props.details.website}</p>}
            {props.details.opening_hours.length !== 0 && <b className="background">Opening Hours</b>}
            {props.details.opening_hours.length !== 0 && props.details.opening_hours.map((val, index) => {
                return <p key={index}>{val}</p>
            })}
        </div>
    )
}

export default LocationDetails