export default function NoKeyboardCollapse(inputElement) {
    let pasted = false;

    inputElement.addEventListener("paste", () => {
        pasted = true;
    });

    inputElement.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" && pasted) {
            ev.preventDefault();
            pasted = false;
            setTimeout(() => inputElement.focus(), 1);
        }
    });

    inputElement.addEventListener("blur", () => {
        setTimeout(() => inputElement.focus(), 10);
    });
}
