export class EnvInit {
  get name() {
    return fetch(
      `${window.location.protocol}//${window.location.host}/env-init/name`,
    )
      .then((result) => result.json())
      .then(({ status, data }) => (status === "OK" ? data : undefined));
  }
  get filter() {
    return fetch(
      `${window.location.protocol}//${window.location.host}/env-init/filter`,
    )
      .then((result) => result.json())
      .then(({ status, data }) => (status === "OK" ? data : undefined));
  }
}
