import { css, html } from "lit";
import { pureLit, useOnce, dispatch } from "pure-lit";
import { Builds } from "./type";

const store = (key: string) => {
    const triggers: (() => void)[] = []
    const notify = () => triggers.forEach(trigger => trigger())
    return {
        set: (value: string) => (window.localStorage.setItem(key, value), notify()),
        get: () => window.localStorage.getItem(key),
        onChange: (delegate: () => void) => triggers.push(delegate)
    }
}

const org = { ...store("org") }
const projects = (() => {
    const storage = store("projects")
    return {
        ...storage,
        get: () => storage.get()?.split(",").map(k => k.trim()) ?? []
    }
})()

pureLit("adoe-input", (el) => {
    return html`<input
        type="text"
        value=${el.value}
        @keypress=${(e: KeyboardEvent) => {
            const element = (e.target as HTMLInputElement);
            if (element.value !== "" && e.key === "Enter") {
                dispatch(el, "change", element.value)
            }
        }} @blur=${(e: Event) => {
            const element = (e.target as HTMLInputElement);
            if (element.value !== "") {
                dispatch(el, "change", element.value)
            }
        }}
    />`
}, {
    defaults: {
        value: ""
    }
})

pureLit("adoe-sign-up-org", () => {
    return html`
        Add org: 
        <adoe-input
            value=${org.get() ?? ""}
            @change=${(e: CustomEvent) => org.set(e.detail)}
        ></adoe-input>`
})
pureLit("adoe-sign-up-projects", () => {
    return html`
        Set comma-separated list of projects: 
        <adoe-input
            value=${projects.get().join(",")}
            @change=${(e: CustomEvent) => projects.set(e.detail)}
        ></adoe-input>`
})
pureLit("adoe-sign-up", () => {
    return html`
        <adoe-sign-up-org></adoe-sign-up-org>
        <adoe-sign-up-projects></adoe-sign-up-projects>
        `
})

pureLit("adoe-select-pipelines", async (el) => {
    useOnce(el, () => {
        org.onChange(() => el.reinitialize())
        projects.onChange(() => el.reinitialize())
        setInterval(() => el.reinitialize(), 1000 * 60)
    })

    if (!org.get() || projects.get().length < 1) return html``

    const pipelines = await Promise.all(
        projects.get().map(project =>
            fetch(`/o/${org.get()}/p/${project}`).then(r => r.json())
        )
    )

    if (pipelines.some(p => p.status !== "OK")) return html``

    const combined = pipelines.reduce((prev, next) => [...prev, ...next.data], []).filter((item: Builds) => item.result === "failed")

    if (combined.length < 1) {
        return html`<img src="https://cataas.com/cat/gif" alt="no issue, watch cats" title="a random cat for a green build">`
    }

    return html`${combined.map((pipeline: Builds) =>
        html`<div>
            <h2><a href="${pipeline._links.web.href}" target="_blank">${pipeline.definition.name}</a></h2> 
            <div>
                <span>${pipeline.triggerInfo["pr.title"] ?? pipeline.reason}</span>
                <small>Blame: ${pipeline.triggerInfo["pr.sender.name"] ?? pipeline.requestedFor.displayName}</small>
            </div>
        </div>`)}`
}, {
    styles: css`
    :host {
        display:flex;
        flex-wrap: wrap;
        align-content: stretch;
    }
    div {
        background-color: #F56565;
        flex-grow: 1;
        margin: 1em;
        padding: 1em;
        color: white;
    }
    div > div {
        display:flex;
        justify-content: space-between;
    }
    img {
        width:100vw; 
        height:90vh; 
        object-fit:cover;
    }
    a {
        color: white;
    }
    `,
    suspense: html`Wait while loading...`
})

pureLit("adoe-dashboard", async () => {

    return html`
        <adoe-sign-up></adoe-sign-up>
        <adoe-select-pipelines>Loading...</adoe-select-pipelines>`
})