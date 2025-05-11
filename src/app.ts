import van from "vanjs-core";

const { span, div, button } = van.tags;

const isLocked = van.state(false);

const WakeLockButton = () => {
    return button(
        {
            class:
                "px-4 py-2 outline-none border-2 border-solid border-black rounded-[5px] shadow-[black_4px_4px] text-center leading-[20px] transition-shadow duration-150 ease-in translate-y-0 font-semibold gap-2 inline-flex justify-center items-center bg-[#88aaee] hover:shadow-none hover:translate-y-[calc(2px*1)] active:shadow-none active:translate-y-[calc(2px*1)]",
            onclick: async () => {
                if (isLocked.oldVal) {
                    (await navigator.wakeLock?.request("screen")).release();
                    isLocked.val = false;
                } else {
                    await navigator.wakeLock?.request("screen");
                    isLocked.val = true;
                }
            },
        },
        van.tags.img({
            src: isLocked.val ? "screen-off.svg" : "screen.svg",
            alt: isLocked.val ? "Screen Off" : "Screen On",
            class: "size-5",
        }),
        isLocked.val ? "Screen can be put to sleep" : "Keep screen awake",
    );
};

const App = () => {
    return div(
        {
            class:
                "bg-[#e6f0ff] bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] h-screen w-screen flex items-center justify-center px-4 lg:px-0",
        },
        div(
            {
                class:
                    "flex flex-col bg-[#dcebfe] items-center gap-2 rounded-lg p-4 w-full max-w-lg border-2 border-solid border-black shadow-black shadow-[4px_4px_0px_0px]",
            },
            div(
                { class: "flex flex-col items-center" },
                span(
                    { class: "text-2xl lg:text-3xl font-semibold" },
                    "Keep Awake",
                ),
                span(
                    { class: "text-lg lg:text-xl italic text-gray-500" },
                    "Simple app to keep your device awake",
                ),
            ),
            WakeLockButton(),
        ),
    );
};

globalThis.addEventListener("focus", () => {
    document.title = "Keep Awake";
    document.querySelector("link[rel='icon']")!.setAttribute(
        "href",
        "/screen.svg",
    );
});
globalThis.addEventListener("blur", () => {
    document.title = isLocked.val
        ? "Active - Keep Awake"
        : "Inactive - Keep Awake";

    document.querySelector("link[rel='icon']")!.setAttribute(
        "href",
        isLocked.val ? "/screen.svg" : "/screen-off.svg",
    );
});

export default App;
