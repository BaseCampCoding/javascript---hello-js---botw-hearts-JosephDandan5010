const heartsContainer = document.querySelector("#hearts-container");
const controlsContainer = document.querySelector("#controls-container");
const hitButton = controlsContainer.querySelector("#hit-button");
const hitDamageInput = controlsContainer.querySelector("#hit-damage-input");
const healButton = controlsContainer.querySelector("#heal-button");
const healAmountInput = controlsContainer.querySelector("#heal-amount-input");
const addHeartContainerButton = controlsContainer.querySelector("#add-heart-container-button");
const overhealButton = controlsContainer.querySelector("#overheal-button");
const overhealAmountInput = controlsContainer.querySelector("#overheal-amount-input");
let health = 35;
let maxHealth = 44;
let overheal = 0; 

function randint(lo, hi) {
  return Math.floor(Math.random() * (hi - lo) + lo);
}

function updateHeartsDisplay() {
  let quartersToFill = health;
  for (const heart of heartsContainer.querySelectorAll(".heart")) {
    if (quartersToFill) {
      let quarters = Math.min(quartersToFill, 4);
      heart.dataset.quarters = quarters;
      quartersToFill -= quarters;
    } else {
      heart.dataset.quarters = 0;
    }
  }
  quartersToFill = overheal;
  for (const heart of heartsContainer.querySelectorAll(".heart.extra")) {
    if (quartersToFill) {
      let quarters = Math.min(quartersToFill, 4);
      heart.dataset.quarters = quarters;
      quartersToFill -= quarters;    
    } else {
      heart.dataset.quarters = 0;
    }
  }
  heartsContainer.innerHTML = heartsContainer.innerHTML.replaceAll(
  `<div class= "heart extra" data-quarters="0">
    <div class="top-left"></div>
    <div class="top-right"></div>
    <div class="bottom-left"></div>
    <div class="bottom-right"></div>
  </div>`, "")
}

addHeartContainerButton.addEventListener("click", function () {
  heartsContainer.children[(maxHealth / 4)  - 1].insertAdjacentHTML('afterend', 
  `<div class="heart" data-quarters="0">
    <div class="top-left"></div>
    <div class="top-right"></div>
    <div class="bottom-left"></div>
    <div class="bottom-right"></div>
  </div>`);
  maxHealth += 4;
  updateHeartsDisplay(); 
});

healButton.addEventListener("click", function () {
  let heal = Number(healAmountInput.value);
  health = Math.max(0, health + heal * 4 );
  updateHeartsDisplay();
});

hitButton.addEventListener("click", function () {
  let damage = Number(hitDamageInput.value);
  if (overheal > 0) {
    overheal = overheal - damage;
    if (overheal < 0 ) {
      health = Math.max(0, health + overheal);
      overheal = 0;
    };
  } else {
    health = Math.max(0, health - damage);
  };
  updateHeartsDisplay();
});

overhealButton.addEventListener("click", function () {
  overheal = Math.max(Number(overhealAmountInput.value) * 4, overheal);
  health = maxHealth;
  for (let i = 0; i < Math.floor(overheal / 4); i++) {
    heartsContainer.innerHTML = heartsContainer.innerHTML + 
`<div class="heart extra" data-quarters="4">
  <div class="top-left"></div>
  <div class="top-right"></div>
  <div class="bottom-left"></div>
  <div class="bottom-right"></div>
</div>`;
  }
  updateHeartsDisplay();
});