import { html } from "lit";
import { pureLit, useOnce } from "pure-lit";
import { name, showInProgress } from "../storage";
import { styles } from "./adoe-build-results.styles";
import { Build } from "../../domain/build"
import { css } from "nested-css-to-flat/lit-css";

export default pureLit("adoe-build-results", async (el) => {
    useOnce(el, () => {
        name.onChange(() => el.reinitialize())
        showInProgress.onChange(() => el.reinitialize())
        window.addEventListener("message", function (ev) {
            if (ev.origin !== this.location.href || ev.data.type === "reinitialize") {
                el.reinitialize()
            }
        })
        setInterval(() => el.reinitialize(), 1000 * 60)
    })

    el.shadowRoot!.adoptedStyleSheets
        .push(css`:host { zoom: 1; }`.styleSheet)


    const names = name.get()

    if (!names || names.length < 1) {
        return html``
    }

    const builds = (await Promise.all(
        names.map(name =>
            fetch(`/status/${name}`).then(r => r.json() as Promise<{ status: string, data: Build[] }>)
        )
    ))

    if (builds.some(p => p.status !== "OK")) return html`An error has occured`

    const combined = builds
        .reduce((prev, next) => [...prev, ...next.data], [] as Build[])
        .filter((item: Build) => item.result === "failed" || (item.result === "running" && showInProgress.get()))

    if (combined.length < 1) {
        return html`<img src="https://cataas.com/cat/gif?c=${new Date().getTime()}" alt="no issue, watch cats" title="a random cat for a green build">`
    }

    function calculateZoom(numElements: number) {
        const gradient = 1 -
            ((Math.log10(numElements) / Math.log10(100))
                / (Math.log10(100) - Math.log10(1)));
        return Math.max(Math.min(gradient, 1), 0.2)
    }

    el.shadowRoot!.adoptedStyleSheets
        .push(css`:host { zoom: ${calculateZoom(combined.length)}; }`.styleSheet)

    return html`${combined.map((build: Build) =>
        html`<div class="${build.result}">
            <h2><a href="${build.meta.link}" target="_blank">${build.projectName}</a></h2> 
            <div>
                <span>${build.meta.triggerReason}</span>
                <small>Blame: ${build.meta.blame}</small>
                <small>${build.meta.when}</small>
            </div>
        </div>`)}`
}, {
    styles,
    suspense: html`<slot></slot>`
});