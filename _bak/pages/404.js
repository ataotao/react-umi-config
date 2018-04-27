
export default ({history,location,match}, props) => {
    console.log(history);
    console.log(location);
    console.log(match);
    console.log(props);
    return (
        <div>
            {location.pathname}
        </div>
    );
};
