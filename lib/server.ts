import app from "./app";
const PORT = 3000;

function lofasz(dummy: string) {
    console.log('dummy: ' + dummy);
}

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
    lofasz("asdasd");
});
