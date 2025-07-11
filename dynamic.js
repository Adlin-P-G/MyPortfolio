const resolver = {
    resolve: function resolve(options, callback) {
      // The string to resolve
      const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
      const combinedOptions = Object.assign({}, options, { resolveString: resolveString });
  
      function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
  
      function randomCharacter(characters) {
        return characters[getRandomInteger(0, characters.length - 1)];
      };
  
      function doRandomiserEffect(options, callback) {
        const characters = options.characters;
        const timeout = options.timeout;
        const element = options.element;
        const partialString = options.partialString;
  
        let iterations = options.iterations;
  
        setTimeout(() => {
          if (iterations >= 0) {
            const nextOptions = Object.assign({}, options, { iterations: iterations - 1 });
  
            // Ensures partialString without the random character as the final state.
            if (iterations === 0) {
              element.textContent = partialString;
            } else {
              // Replaces the last character of partialString with a random character
              element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
            }
  
            doRandomiserEffect(nextOptions, callback);
          } else if (typeof callback === "function") {
            callback();
          }
        }, options.timeout);
      };
  
      function doResolverEffect(options, callback) {
        const resolveString = options.resolveString;
        const characters = options.characters;
        const offset = options.offset;
        const partialString = resolveString.substring(0, offset);
        const combinedOptions = Object.assign({}, options, { partialString: partialString });
  
        doRandomiserEffect(combinedOptions, () => {
          const nextOptions = Object.assign({}, options, { offset: offset + 1 });
  
          if (offset <= resolveString.length) {
            doResolverEffect(nextOptions, callback);
          } else if (typeof callback === "function") {
            callback();
          }
        });
      };
  
      doResolverEffect(combinedOptions, callback);
    } };
  
  
  /* Some GLaDOS quotes from Portal 2 chapter 9: The Part Where He Kills You
   * Source: http://theportalwiki.com/wiki/GLaDOS_voice_lines#Chapter_9:_The_Part_Where_He_Kills_You
   */
  const strings = [
  "Python and SNow Developer"];
  
  
  // let counter = 0;
  
  const options = {
    // Initial position
    offset: 0,
    // Timeout between each random character
    timeout: 5,
    // Number of random characters to show
    iterations: 10,
    // Random characters to pick from
    characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
    // String to resolve
    resolveString: strings[0],
    // The element
    element: document.querySelector('[data-target-resolver]') };

  resolver.resolve(options);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
      const elementsToHide = document.querySelectorAll('.scroll-down');
      elementsToHide.forEach(element => {
        element.style.display = 'none';
      });
    }
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
      const elementsToShow = document.querySelectorAll('.scroll-down');
      elementsToShow.forEach(element => {
        element.style.display = 'block';
      });
    }
  });

  // window.addEventListener('load', () => {
  //   window.scrollTo(0, 0);
  // });

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
  
    const elementsToHide = document.querySelectorAll('.scroll-down');
    elementsToHide.forEach(element => {
      if (scrollPosition > 100) { // Adjust the threshold as needed
        element.style.display = 'none';
      } else {
        element.style.display = 'block';
      }
    });
  });