export const showErrs = (errs, errsContainer) => {
  errsContainer.firstChild?.remove();

  const errsDiv = document.createElement("div");
  errs.map((err) => {
    errsDiv.innerHTML += `
        <h2 class="w-60 md:w-96 mx-auto text-center text-red-700 bg-red-100 my-4 py-4 border-l-8 border-red-700">
          ${err}
        </h2>
        `;

    return 0;
  });

  errsContainer.appendChild(errsDiv);
};
