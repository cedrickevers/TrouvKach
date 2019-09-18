import * as React from "react";
import ReactDOM from "react-dom";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
import l from "leaflet";
import {
    Card,
    Button,
    CardTitle,
    CardText,
    Row,
    Col,
    Form,
    FormControl,
    FormGroup,
    ControlLabel,
    Label,
    Input,
} from "reactstrap";

import Parser from "html-react-parser";

import HelloWorld from "./components/hello";
import "../app.css";
import "leaflet/dist/leaflet.css";

const myIcon = L.icon({
    iconUrl:
        "data:image/png;base64,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",
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
});

class App extends React.Component {
    state = {
        location: {
            lat: 51.505,
            lng: -0.09,
        },
        zoom: 2,
        listATM: [],
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                location: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                },
                haveUsersLocation: true,
                zoom: 13,
            });
        });
        fetch("http://localhost:7778/atm")
            .then(response => response.json())
            .then(listATM => this.setState({listATM}));
    }
    formSubmitted = event => {
        event.preventDefault();
    };

    render() {
        const position = [this.state.location.lat, this.state.location.lng];
        const listATM = this.state.listATM;
        return (
            <div>
                <Map
                    className={"leaflet-map"}
                    center={position}
                    zoom={this.state.zoom}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url={
                            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        }
                    />
                    <Marker position={position} icon={myIcon}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                    {listATM.map((value, index) => (
                        <Marker
                            key={index}
                            position={[value.latitude, value.longitude]}
                            icon={myIcon}
                        />
                    ))}
                </Map>

                <Card body className={"react-form"}>
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>
                        With supporting text below as a natural lead-in to
                        additional content.
                    </CardText>
                    <Button>Go somewhere</Button>
                    <Form onSubmit={this.formSbmitted}>
                        <FormGroup>
                            <Label for={"exampleEmail"} sm={2}>
                                Email
                            </Label>
                            <Col sm={10}>
                                <Input
                                    type={"email"}
                                    name={"email"}
                                    id={"exampleEmail"}
                                    placeholder={"with a placeholder"}
                                />
                            </Col>
                        </FormGroup>
                        <Button
                            type={"submit"}
                            color={"info"}
                            disabled={!this.state.haveUsersLocation}>
                            {" "}
                            Send
                        </Button>
                    </Form>
                </Card>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector("#app"));
