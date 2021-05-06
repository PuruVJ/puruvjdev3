import { respond } from '@sveltejs/kit/ssr';
import root from './generated/root.svelte';
import { set_paths } from './runtime/paths.js';
import { set_prerendering } from './runtime/env.js';
import * as user_hooks from "./hooks.js";

const template = ({ head, body }) => "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <base href=\"/\" />\n    <meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0\" />\n    <meta name=\"apple-mobile-web-app-capable\" content=\"yes\" />\n    <link rel=\"apple-touch-icon\" href=\"/icons/favicon.png\" />\n    <link rel=\"favicon\" href=\"/icons/favicon.png\" />\n\n    <script src=\"https://polyfill.io/v3/polyfill.min.js\" defer></script>\n    <link rel=\"manifest\" href=\"/manifest.json\" />\n    <link\n      rel=\"preload\"\n      href=\"https://fonts.googleapis.com/css2?family=Comfortaa:wght@400&family=JetBrains+Mono:wght@400&family=Quicksand:wght@400;500&display=swap\"\n      as=\"style\"\n      onload=\"this.onload=null;this.rel='stylesheet'\"\n      onerror=\"this.onerror=null;this.rel='stylesheet'\"\n    />\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin />\n\n    " + head + "\n\n    <meta name=\"twitter:card\" content=\"summary_large_image\" />\n  </head>\n  <body>\n    <div id=\"svelte\">" + body + "</div>\n\n    <script>\n      // Get localstorage value\n      const localTheme = localStorage.getItem('theme');\n      const prefersTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;\n\n      const theme = localTheme || (prefersTheme ? 'dark' : 'light');\n\n      document.body.dataset.theme = theme;\n\n      localStorage.setItem('theme', theme);\n    </script>\n  </body>\n</html>\n";

let options = null;

// allow paths to be overridden in svelte-kit preview
// and in prerendering
export function init(settings) {
	set_paths(settings.paths);
	set_prerendering(settings.prerendering || false);

	options = {
		amp: false,
		dev: false,
		entry: {
			file: "/static/_app/start-416d15f6.js",
			css: ["/static/_app/assets/start-a8cd1609.css"],
			js: ["/static/_app/start-416d15f6.js","/static/_app/chunks/vendor-611e31f7.js","/static/_app/chunks/preload-helper-9f12a5fd.js"]
		},
		fetched: undefined,
		floc: false,
		get_component_path: id => "/static/_app/" + entry_lookup[id],
		get_stack: error => String(error), // for security
		handle_error: error => {
			console.error(error.stack);
			error.stack = options.get_stack(error);
		},
		hooks: get_hooks(user_hooks),
		hydrate: true,
		initiator: undefined,
		load_component,
		manifest,
		paths: settings.paths,
		read: settings.read,
		root,
		router: true,
		ssr: true,
		target: "#svelte",
		template
	};
}

const d = decodeURIComponent;
const empty = () => ({});

const manifest = {
	assets: [{"file":"art/background.svg","size":15972,"type":"image/svg+xml"},{"file":"blog/an-ode-to-typescript.json","size":65020,"type":"application/json"},{"file":"blog/blog-every-week-rant.json","size":1910,"type":"application/json"},{"file":"blog/chaining-promises-array-methods.json","size":21523,"type":"application/json"},{"file":"blog/create-folder-if-not-exists.json","size":7242,"type":"application/json"},{"file":"blog/declaring-undying-love-for-typescript.json","size":63179,"type":"application/json"},{"file":"blog/deep-dive-into-preact-source-code.json","size":132379,"type":"application/json"},{"file":"blog/flatten-settimeout.json","size":9430,"type":"application/json"},{"file":"blog/fs-promises.json","size":69095,"type":"application/json"},{"file":"blog/get-free-github-pro-and-perks.json","size":5347,"type":"application/json"},{"file":"blog/get-to-know-typescript--mindblowing-typescript-tricks.json","size":73701,"type":"application/json"},{"file":"blog/get-to-know-typescript--pick-helper-type.json","size":3302,"type":"application/json"},{"file":"blog/get-to-know-typescript--react-hooks-return-array-issue.json","size":24541,"type":"application/json"},{"file":"blog/get-to-know-typescript--using-typescript-without-typescript.json","size":113036,"type":"application/json"},{"file":"blog/get-to-know-typescript-an-ode-to-typescript.json","size":69915,"type":"application/json"},{"file":"blog/gif-to-mp4-ffmpeg-fluent-web.json","size":34874,"type":"application/json"},{"file":"blog/git-pr-clean-commits.json","size":6963,"type":"application/json"},{"file":"blog/google-fonts-prefetch.json","size":8026,"type":"application/json"},{"file":"blog/how-i-created-personal-site-part-1.json","size":18634,"type":"application/json"},{"file":"blog/how-i-created-personal-site-part-2.json","size":28963,"type":"application/json"},{"file":"blog/how-i-created-personal-site-part-3.json","size":32781,"type":"application/json"},{"file":"blog/link-noopener.json","size":4426,"type":"application/json"},{"file":"blog/macos-dock-animation-svelte.json","size":96208,"type":"application/json"},{"file":"blog/move-to-css-modules-from-styled-components.json","size":56519,"type":"application/json"},{"file":"blog/moving-macos-from-react-to-preact-vite.json","size":35544,"type":"application/json"},{"file":"blog/my-first-blog.json","size":9246,"type":"application/json"},{"file":"blog/pitfalls-stencil-helmet-prerendering.json","size":2871,"type":"application/json"},{"file":"blog/promisify-callbacks-in-nodejs.json","size":28437,"type":"application/json"},{"file":"blog/setup-prettier-vscode.json","size":16815,"type":"application/json"},{"file":"blog/split-array-chunks.json","size":18725,"type":"application/json"},{"file":"blog/stencil-router-events.json","size":19351,"type":"application/json"},{"file":"blog/top-level-await.json","size":41337,"type":"application/json"},{"file":"blog/web-workers-intro-basic-usage.json","size":8804,"type":"application/json"},{"file":"data/blogs-list.json","size":8265,"type":"application/json"},{"file":"data/homepage-blogs-list.json","size":1886,"type":"application/json"},{"file":"data/works.json","size":2974,"type":"application/json"},{"file":"emojis/love.svg","size":368,"type":"image/svg+xml"},{"file":"emojis/starry.svg","size":1270,"type":"image/svg+xml"},{"file":"emojis/unicorn.svg","size":2417,"type":"image/svg+xml"},{"file":"icons/favicon-144x144.webp","size":2860,"type":"image/webp"},{"file":"icons/favicon-512x512.webp","size":7806,"type":"image/webp"},{"file":"icons/favicon-dark.png","size":3791,"type":"image/png"},{"file":"icons/favicon-dark.svg","size":3538,"type":"image/svg+xml"},{"file":"icons/favicon-dev.svg","size":3538,"type":"image/svg+xml"},{"file":"icons/favicon-light.png","size":1815,"type":"image/png"},{"file":"icons/favicon-light.svg","size":3538,"type":"image/svg+xml"},{"file":"icons/favicon-midday.png","size":1833,"type":"image/png"},{"file":"icons/favicon-midday.svg","size":3538,"type":"image/svg+xml"},{"file":"icons/favicon.png","size":31674,"type":"image/png"},{"file":"icons/logo-192.png","size":4760,"type":"image/png"},{"file":"icons/logo-512.png","size":64721,"type":"image/png"},{"file":"manifest.json","size":415,"type":"application/json"},{"file":"media/blog-every-day-blog-page-image/data.json","size":18,"type":"application/json"},{"file":"media/blog-every-day-blog-page-image/large.png","size":293044,"type":"image/png"},{"file":"media/blog-every-day-blog-page-image/small.png","size":107765,"type":"image/png"},{"file":"media/blog-every-day-blog-page-image.png","size":141117,"type":"image/png"},{"file":"media/blog-social-intro.png","size":42530,"type":"image/png"},{"file":"media/brick-wall/data.json","size":18,"type":"application/json"},{"file":"media/brick-wall/large.jpg","size":287126,"type":"image/jpeg"},{"file":"media/brick-wall/small.jpg","size":82738,"type":"image/jpeg"},{"file":"media/brick-wall.jpg","size":467777,"type":"image/jpeg"},{"file":"media/camera-scenery/data.json","size":32,"type":"application/json"},{"file":"media/camera-scenery/large.jpg","size":82133,"type":"image/jpeg"},{"file":"media/camera-scenery/small.jpg","size":29280,"type":"image/jpeg"},{"file":"media/camera-scenery.jpg","size":135642,"type":"image/jpeg"},{"file":"media/declaring-my-undying-love-for-typescript-code-sample-1/vidgif.mp4","size":193398,"type":"video/mp4"},{"file":"media/declaring-my-undying-love-for-typescript-code-sample-1.gif","size":142153,"type":"image/gif"},{"file":"media/declaring-my-undying-love-for-typescript-code-sample-2/vidgif.mp4","size":221773,"type":"video/mp4"},{"file":"media/declaring-my-undying-love-for-typescript-code-sample-2.gif","size":247405,"type":"image/gif"},{"file":"media/declaring-my-undying-love-for-typescript-code-sample-pick-helper-type/vidgif.mp4","size":220062,"type":"video/mp4"},{"file":"media/declaring-my-undying-love-for-typescript-code-sample-pick-helper-type.gif","size":200773,"type":"image/gif"},{"file":"media/declaring-my-undying-love-for-typescript-intersection-type/vidgif.mp4","size":414717,"type":"video/mp4"},{"file":"media/declaring-my-undying-love-for-typescript-intersection-type.gif","size":329108,"type":"image/gif"},{"file":"media/declaring-my-undying-love-for-typescript-pick-styled-components/data.json","size":32,"type":"application/json"},{"file":"media/declaring-my-undying-love-for-typescript-pick-styled-components/large.png","size":85822,"type":"image/png"},{"file":"media/declaring-my-undying-love-for-typescript-pick-styled-components/small.png","size":31380,"type":"image/png"},{"file":"media/declaring-my-undying-love-for-typescript-pick-styled-components.png","size":59146,"type":"image/png"},{"file":"media/declaring-my-undying-love-for-typescript-sun-love/data.json","size":32,"type":"application/json"},{"file":"media/declaring-my-undying-love-for-typescript-sun-love/large.jpg","size":37017,"type":"image/jpeg"},{"file":"media/declaring-my-undying-love-for-typescript-sun-love/small.jpg","size":14662,"type":"image/jpeg"},{"file":"media/declaring-my-undying-love-for-typescript-sun-love.jpg","size":105295,"type":"image/jpeg"},{"file":"media/declaring-my-undying-love-for-typescript-template-literal-type/vidgif.mp4","size":338054,"type":"video/mp4"},{"file":"media/declaring-my-undying-love-for-typescript-template-literal-type.gif","size":528223,"type":"image/gif"},{"file":"media/deep-dive-preact-source--always-has-been-meme/data.json","size":32,"type":"application/json"},{"file":"media/deep-dive-preact-source--always-has-been-meme/large.jpg","size":90567,"type":"image/jpeg"},{"file":"media/deep-dive-preact-source--always-has-been-meme/small.jpg","size":34691,"type":"image/jpeg"},{"file":"media/deep-dive-preact-source--always-has-been-meme.jpg","size":102587,"type":"image/jpeg"},{"file":"media/deep-dive-preact-source--astonished-cat/vidgif.mp4","size":114766,"type":"video/mp4"},{"file":"media/deep-dive-preact-source--astonished-cat.gif","size":578229,"type":"image/gif"},{"file":"media/deep-dive-preact-source--cover/data.json","size":18,"type":"application/json"},{"file":"media/deep-dive-preact-source--cover/large.jpg","size":85877,"type":"image/jpeg"},{"file":"media/deep-dive-preact-source--cover/small.jpg","size":26175,"type":"image/jpeg"},{"file":"media/deep-dive-preact-source--cover.jpg","size":257400,"type":"image/jpeg"},{"file":"media/deep-dive-preact-source--katniss-salute/vidgif.mp4","size":24221,"type":"video/mp4"},{"file":"media/deep-dive-preact-source--katniss-salute.gif","size":408865,"type":"image/gif"},{"file":"media/deep-dive-preact-source--wait-what/vidgif.mp4","size":82615,"type":"video/mp4"},{"file":"media/deep-dive-preact-source--wait-what.gif","size":590713,"type":"image/gif"},{"file":"media/dev-automation-10-min/data.json","size":32,"type":"application/json"},{"file":"media/dev-automation-10-min/large.jpg","size":123722,"type":"image/jpeg"},{"file":"media/dev-automation-10-min/small.jpg","size":50725,"type":"image/jpeg"},{"file":"media/dev-automation-10-min.jpg","size":92884,"type":"image/jpeg"},{"file":"media/dumbledore-pretty-hard/vidgif.mp4","size":69643,"type":"video/mp4"},{"file":"media/dumbledore-pretty-hard.gif","size":1017667,"type":"image/gif"},{"file":"media/fork-ahead-upstream-header-image/data.json","size":18,"type":"application/json"},{"file":"media/fork-ahead-upstream-header-image/large.png","size":272078,"type":"image/png"},{"file":"media/fork-ahead-upstream-header-image/small.png","size":86073,"type":"image/png"},{"file":"media/fork-ahead-upstream-header-image.png","size":107074,"type":"image/png"},{"file":"media/format-on-save/vidgif.mp4","size":858422,"type":"video/mp4"},{"file":"media/format-on-save.gif","size":744350,"type":"image/gif"},{"file":"media/free-github-student-po-awestruck/vidgif.mp4","size":146419,"type":"video/mp4"},{"file":"media/free-github-student-po-awestruck.gif","size":1328849,"type":"image/gif"},{"file":"media/fs-promise-requires/data.json","size":32,"type":"application/json"},{"file":"media/fs-promise-requires/large.jpg","size":90571,"type":"image/jpeg"},{"file":"media/fs-promise-requires/small.jpg","size":34236,"type":"image/jpeg"},{"file":"media/fs-promise-requires.jpg","size":1084335,"type":"image/jpeg"},{"file":"media/git-pr-clean-commits/data.json","size":20,"type":"application/json"},{"file":"media/git-pr-clean-commits/large.jpg","size":169348,"type":"image/jpeg"},{"file":"media/git-pr-clean-commits/small.jpg","size":39967,"type":"image/jpeg"},{"file":"media/git-pr-clean-commits.jpg","size":576188,"type":"image/jpeg"},{"file":"media/github-student-pack-study-table/data.json","size":32,"type":"application/json"},{"file":"media/github-student-pack-study-table/large.jpg","size":82283,"type":"image/jpeg"},{"file":"media/github-student-pack-study-table/small.jpg","size":29386,"type":"image/jpeg"},{"file":"media/github-student-pack-study-table.jpg","size":218500,"type":"image/jpeg"},{"file":"media/golden-spiral/data.json","size":32,"type":"application/json"},{"file":"media/golden-spiral/large.jpg","size":189247,"type":"image/jpeg"},{"file":"media/golden-spiral/small.jpg","size":53956,"type":"image/jpeg"},{"file":"media/golden-spiral.jpg","size":307339,"type":"image/jpeg"},{"file":"media/harry-firebolt-eats-cupcake/vidgif.mp4","size":112500,"type":"video/mp4"},{"file":"media/harry-firebolt-eats-cupcake.gif","size":887339,"type":"image/gif"},{"file":"media/link-fence/data.json","size":32,"type":"application/json"},{"file":"media/link-fence/large.jpg","size":132678,"type":"image/jpeg"},{"file":"media/link-fence/small.jpg","size":50370,"type":"image/jpeg"},{"file":"media/link-fence.jpg","size":200213,"type":"image/jpeg"},{"file":"media/link-noopener.mp4","size":1016850,"type":"video/mp4"},{"file":"media/macos-dock-animation-svelte--animation-preview/vidgif.mp4","size":680814,"type":"video/mp4"},{"file":"media/macos-dock-animation-svelte--animation-preview.gif","size":3428870,"type":"image/gif"},{"file":"media/macos-dock-animation-svelte--cover/data.json","size":17,"type":"application/json"},{"file":"media/macos-dock-animation-svelte--cover/large.png","size":609072,"type":"image/png"},{"file":"media/macos-dock-animation-svelte--cover/small.png","size":184701,"type":"image/png"},{"file":"media/macos-dock-animation-svelte--cover.png","size":848800,"type":"image/png"},{"file":"media/macos-dock-animation-svelte--marked-dock-positions/data.json","size":32,"type":"application/json"},{"file":"media/macos-dock-animation-svelte--marked-dock-positions/large.jpg","size":63152,"type":"image/jpeg"},{"file":"media/macos-dock-animation-svelte--marked-dock-positions/small.jpg","size":23577,"type":"image/jpeg"},{"file":"media/macos-dock-animation-svelte--marked-dock-positions.jpg","size":2204210,"type":"image/jpeg"},{"file":"media/macos-dock-animation-svelte--scaffold-wallpaper/data.json","size":20,"type":"application/json"},{"file":"media/macos-dock-animation-svelte--scaffold-wallpaper/large.png","size":508899,"type":"image/png"},{"file":"media/macos-dock-animation-svelte--scaffold-wallpaper/small.png","size":142993,"type":"image/png"},{"file":"media/macos-dock-animation-svelte--scaffold-wallpaper.png","size":1817293,"type":"image/png"},{"file":"media/macos-dock-animation-svelte--the-dock-itself/data.json","size":33,"type":"application/json"},{"file":"media/macos-dock-animation-svelte--the-dock-itself/large.png","size":115336,"type":"image/png"},{"file":"media/macos-dock-animation-svelte--the-dock-itself/small.png","size":39140,"type":"image/png"},{"file":"media/macos-dock-animation-svelte--the-dock-itself.png","size":185400,"type":"image/png"},{"file":"media/mindblowing-typescript-tricks--cover/data.json","size":32,"type":"application/json"},{"file":"media/mindblowing-typescript-tricks--cover/large.jpg","size":133741,"type":"image/jpeg"},{"file":"media/mindblowing-typescript-tricks--cover/small.jpg","size":35953,"type":"image/jpeg"},{"file":"media/mindblowing-typescript-tricks--cover.jpg","size":451312,"type":"image/jpeg"},{"file":"media/moving-from-react-to-preact-vite--always-has-been-meme/data.json","size":32,"type":"application/json"},{"file":"media/moving-from-react-to-preact-vite--always-has-been-meme/large.jpg","size":95668,"type":"image/jpeg"},{"file":"media/moving-from-react-to-preact-vite--always-has-been-meme/small.jpg","size":38341,"type":"image/jpeg"},{"file":"media/moving-from-react-to-preact-vite--always-has-been-meme.jpg","size":109339,"type":"image/jpeg"},{"file":"media/moving-from-react-to-preact-vite--banging-head/vidgif.mp4","size":60218,"type":"video/mp4"},{"file":"media/moving-from-react-to-preact-vite--banging-head.gif","size":1333991,"type":"image/gif"},{"file":"media/moving-from-react-to-preact-vite--cover/data.json","size":32,"type":"application/json"},{"file":"media/moving-from-react-to-preact-vite--cover/large.jpg","size":114413,"type":"image/jpeg"},{"file":"media/moving-from-react-to-preact-vite--cover/small.jpg","size":38437,"type":"image/jpeg"},{"file":"media/moving-from-react-to-preact-vite--cover.jpg","size":317365,"type":"image/jpeg"},{"file":"media/moving-from-react-to-preact-vite--jaw-drop/vidgif.mp4","size":25828,"type":"video/mp4"},{"file":"media/moving-from-react-to-preact-vite--jaw-drop.gif","size":94205,"type":"image/gif"},{"file":"media/moving-from-react-to-preact-vite--macos-screenshot/data.json","size":20,"type":"application/json"},{"file":"media/moving-from-react-to-preact-vite--macos-screenshot/large.png","size":320138,"type":"image/png"},{"file":"media/moving-from-react-to-preact-vite--macos-screenshot/small.png","size":125405,"type":"image/png"},{"file":"media/moving-from-react-to-preact-vite--macos-screenshot.png","size":958627,"type":"image/png"},{"file":"media/moving-from-react-to-preact-vite--rookie-numbers.gif","size":1069740,"type":"image/gif"},{"file":"media/pick-helper-crossroads.jpg","size":90377,"type":"image/jpeg"},{"file":"media/prettier-setup-format-option-vscode/vidgif.mp4","size":352374,"type":"video/mp4"},{"file":"media/prettier-setup-format-option-vscode.gif","size":292345,"type":"image/gif"},{"file":"media/prettier-setup-ugly-vs-clean/data.json","size":20,"type":"application/json"},{"file":"media/prettier-setup-ugly-vs-clean/large.jpg","size":125148,"type":"image/jpeg"},{"file":"media/prettier-setup-ugly-vs-clean/small.jpg","size":43918,"type":"image/jpeg"},{"file":"media/prettier-setup-ugly-vs-clean.jpg","size":1560595,"type":"image/jpeg"},{"file":"media/promisify-callbacks-in-nodejs-goku-meme/vidgif.mp4","size":21950,"type":"video/mp4"},{"file":"media/promisify-callbacks-in-nodejs-goku-meme.gif","size":66662,"type":"image/gif"},{"file":"media/promisify-callbacks-in-nodejs-promises-everywhere/data.json","size":32,"type":"application/json"},{"file":"media/promisify-callbacks-in-nodejs-promises-everywhere/large.jpg","size":75910,"type":"image/jpeg"},{"file":"media/promisify-callbacks-in-nodejs-promises-everywhere/small.jpg","size":31813,"type":"image/jpeg"},{"file":"media/promisify-callbacks-in-nodejs-promises-everywhere.jpg","size":202869,"type":"image/jpeg"},{"file":"media/road-grey-asphalt/data.json","size":32,"type":"application/json"},{"file":"media/road-grey-asphalt/large.jpg","size":101016,"type":"image/jpeg"},{"file":"media/road-grey-asphalt/small.jpg","size":32693,"type":"image/jpeg"},{"file":"media/road-grey-asphalt.jpg","size":156813,"type":"image/jpeg"},{"file":"media/ronaldo-brace-yourself/vidgif.mp4","size":195996,"type":"video/mp4"},{"file":"media/ronaldo-brace-yourself.gif","size":5382349,"type":"image/gif"},{"file":"media/Screenshot_1.png","size":209158,"type":"image/png"},{"file":"media/segregate-array-return-types-react-batman-robin/vidgif.mp4","size":83799,"type":"video/mp4"},{"file":"media/segregate-array-return-types-react-batman-robin.gif","size":524826,"type":"image/gif"},{"file":"media/segregate-array-return-types-react-confusion/vidgif.mp4","size":71626,"type":"video/mp4"},{"file":"media/segregate-array-return-types-react-confusion.gif","size":1732304,"type":"image/gif"},{"file":"media/segregate-array-return-types-react-error-array-type/vidgif.mp4","size":396836,"type":"video/mp4"},{"file":"media/segregate-array-return-types-react-error-array-type.gif","size":402231,"type":"image/gif"},{"file":"media/timer/data.json","size":20,"type":"application/json"},{"file":"media/timer/large.jpg","size":87315,"type":"image/jpeg"},{"file":"media/timer/small.jpg","size":29026,"type":"image/jpeg"},{"file":"media/timer.jpg","size":136103,"type":"image/jpeg"},{"file":"media/tony-cap-handshake-endgame/vidgif.mp4","size":73479,"type":"video/mp4"},{"file":"media/tony-cap-handshake-endgame.gif","size":2493162,"type":"image/gif"},{"file":"media/tony-punch-cap-perfect-teeth/vidgif.mp4","size":59661,"type":"video/mp4"},{"file":"media/tony-punch-cap-perfect-teeth.gif","size":907515,"type":"image/gif"},{"file":"media/top-level-await-force-strong-darth-vader/vidgif.mp4","size":78955,"type":"video/mp4"},{"file":"media/top-level-await-force-strong-darth-vader.gif","size":682520,"type":"image/gif"},{"file":"media/top-level-await-top-of-the-world/data.json","size":19,"type":"application/json"},{"file":"media/top-level-await-top-of-the-world/large.jpg","size":87418,"type":"image/jpeg"},{"file":"media/top-level-await-top-of-the-world/small.jpg","size":28909,"type":"image/jpeg"},{"file":"media/top-level-await-top-of-the-world.jpg","size":243807,"type":"image/jpeg"},{"file":"media/using-ts-without-ts-developit-tweet/data.json","size":32,"type":"application/json"},{"file":"media/using-ts-without-ts-developit-tweet/large.png","size":144525,"type":"image/png"},{"file":"media/using-ts-without-ts-developit-tweet/small.png","size":54846,"type":"image/png"},{"file":"media/using-ts-without-ts-developit-tweet.png","size":114182,"type":"image/png"},{"file":"media/using-ts-without-ts-double-terminals/data.json","size":20,"type":"application/json"},{"file":"media/using-ts-without-ts-double-terminals/large.png","size":311343,"type":"image/png"},{"file":"media/using-ts-without-ts-double-terminals/small.png","size":87076,"type":"image/png"},{"file":"media/using-ts-without-ts-double-terminals.png","size":871790,"type":"image/png"},{"file":"media/using-ts-without-ts-hermione-goes-crazy/vidgif.mp4","size":95219,"type":"video/mp4"},{"file":"media/using-ts-without-ts-hermione-goes-crazy.gif","size":1679910,"type":"image/gif"},{"file":"media/using-ts-without-ts-jsdoc-starting/vidgif.mp4","size":72353,"type":"video/mp4"},{"file":"media/using-ts-without-ts-jsdoc-starting.gif","size":61377,"type":"image/gif"},{"file":"media/using-ts-without-ts-rich-harris-tweet/data.json","size":32,"type":"application/json"},{"file":"media/using-ts-without-ts-rich-harris-tweet/large.png","size":156828,"type":"image/png"},{"file":"media/using-ts-without-ts-rich-harris-tweet/small.png","size":59307,"type":"image/png"},{"file":"media/using-ts-without-ts-rich-harris-tweet.png","size":141127,"type":"image/png"},{"file":"media/why-move-styled-to-css-modules--bilbo-keep-it-meme/data.json","size":32,"type":"application/json"},{"file":"media/why-move-styled-to-css-modules--bilbo-keep-it-meme/large.jpg","size":125195,"type":"image/jpeg"},{"file":"media/why-move-styled-to-css-modules--bilbo-keep-it-meme/small.jpg","size":49208,"type":"image/jpeg"},{"file":"media/why-move-styled-to-css-modules--bilbo-keep-it-meme.jpg","size":68135,"type":"image/jpeg"},{"file":"media/why-move-styled-to-css-modules--cover/data.json","size":32,"type":"application/json"},{"file":"media/why-move-styled-to-css-modules--cover/large.jpg","size":144248,"type":"image/jpeg"},{"file":"media/why-move-styled-to-css-modules--cover/small.jpg","size":49626,"type":"image/jpeg"},{"file":"media/why-move-styled-to-css-modules--cover.jpg","size":399834,"type":"image/jpeg"},{"file":"media/why-move-styled-to-css-modules--hail-modules/data.json","size":32,"type":"application/json"},{"file":"media/why-move-styled-to-css-modules--hail-modules/large.jpg","size":45643,"type":"image/jpeg"},{"file":"media/why-move-styled-to-css-modules--hail-modules/small.jpg","size":17407,"type":"image/jpeg"},{"file":"media/why-move-styled-to-css-modules--hail-modules.jpg","size":76526,"type":"image/jpeg"},{"file":"media/why-move-styled-to-css-modules--here-be-dragons/vidgif.mp4","size":126314,"type":"video/mp4"},{"file":"media/why-move-styled-to-css-modules--here-be-dragons.gif","size":2088145,"type":"image/gif"},{"file":"media/why-move-styled-to-css-modules--optimised-css-modules/data.json","size":20,"type":"application/json"},{"file":"media/why-move-styled-to-css-modules--optimised-css-modules/large.png","size":590643,"type":"image/png"},{"file":"media/why-move-styled-to-css-modules--optimised-css-modules/small.png","size":254096,"type":"image/png"},{"file":"media/why-move-styled-to-css-modules--optimised-css-modules.png","size":365359,"type":"image/png"},{"file":"media/why-move-styled-to-css-modules--optimised-js/data.json","size":32,"type":"application/json"},{"file":"media/why-move-styled-to-css-modules--optimised-js/large.png","size":1226027,"type":"image/png"},{"file":"media/why-move-styled-to-css-modules--optimised-js/small.png","size":312940,"type":"image/png"},{"file":"media/why-move-styled-to-css-modules--optimised-js.png","size":447493,"type":"image/png"},{"file":"media/why-move-styled-to-css-modules--perfection/vidgif.mp4","size":54542,"type":"video/mp4"},{"file":"media/why-move-styled-to-css-modules--perfection.gif","size":275457,"type":"image/gif"},{"file":"media/why-move-styled-to-css-modules--thanos-gamora-everything/vidgif.mp4","size":189690,"type":"video/mp4"},{"file":"media/why-move-styled-to-css-modules--thanos-gamora-everything.gif","size":1688195,"type":"image/gif"},{"file":"media/why-move-styled-to-css-modules--unmin-styled-comps-code/data.json","size":20,"type":"application/json"},{"file":"media/why-move-styled-to-css-modules--unmin-styled-comps-code/large.png","size":167464,"type":"image/png"},{"file":"media/why-move-styled-to-css-modules--unmin-styled-comps-code/small.png","size":72084,"type":"image/png"},{"file":"media/why-move-styled-to-css-modules--unmin-styled-comps-code.png","size":114239,"type":"image/png"},{"file":"media/writing-pen-paper/data.json","size":32,"type":"application/json"},{"file":"media/writing-pen-paper/large.jpg","size":79677,"type":"image/jpeg"},{"file":"media/writing-pen-paper/small.jpg","size":31809,"type":"image/jpeg"},{"file":"media/writing-pen-paper.jpg","size":116937,"type":"image/jpeg"},{"file":"photos/puru-profile.jpg","size":25978,"type":"image/jpeg"},{"file":"readme/series-blog-overview.png","size":76586,"type":"image/png"},{"file":"readme/series-links.png","size":30465,"type":"image/png"},{"file":"readme/theming.gif","size":818071,"type":"image/gif"},{"file":"works/macos/data.json","size":40,"type":"application/json"},{"file":"works/macos/large.png","size":207745,"type":"image/png"},{"file":"works/macos/large.webp","size":29302,"type":"image/webp"},{"file":"works/macos/small.png","size":56833,"type":"image/png"},{"file":"works/macos/small.webp","size":12348,"type":"image/webp"},{"file":"works/macos.png","size":1880207,"type":"image/png"},{"file":"works/ms-todo/data.json","size":39,"type":"application/json"},{"file":"works/ms-todo/large.png","size":811542,"type":"image/png"},{"file":"works/ms-todo/large.webp","size":65748,"type":"image/webp"},{"file":"works/ms-todo/small.png","size":255369,"type":"image/png"},{"file":"works/ms-todo/small.webp","size":25214,"type":"image/webp"},{"file":"works/ms-todo.png","size":2657971,"type":"image/png"},{"file":"works/peh/data.json","size":41,"type":"application/json"},{"file":"works/peh/large.png","size":233660,"type":"image/png"},{"file":"works/peh/large.webp","size":64028,"type":"image/webp"},{"file":"works/peh/small.png","size":69244,"type":"image/png"},{"file":"works/peh/small.webp","size":25940,"type":"image/webp"},{"file":"works/peh.png","size":2301400,"type":"image/png"},{"file":"works/puruvjdev2/data.json","size":41,"type":"application/json"},{"file":"works/puruvjdev2/large.png","size":60721,"type":"image/png"},{"file":"works/puruvjdev2/large.webp","size":31792,"type":"image/webp"},{"file":"works/puruvjdev2/small.png","size":20245,"type":"image/png"},{"file":"works/puruvjdev2/small.webp","size":12548,"type":"image/webp"},{"file":"works/puruvjdev2.png","size":483683,"type":"image/png"}],
	layout: "src/routes/$layout.svelte",
	error: "src/routes/$error.svelte",
	routes: [
		{
						type: 'page',
						pattern: /^\/$/,
						params: empty,
						a: ["src/routes/$layout.svelte", "src/routes/index.svelte"],
						b: ["src/routes/$error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/works\/?$/,
						params: empty,
						a: ["src/routes/$layout.svelte", "src/routes/works.svelte"],
						b: ["src/routes/$error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/blog\/?$/,
						params: empty,
						a: ["src/routes/$layout.svelte", "src/routes/blog/index.svelte"],
						b: ["src/routes/$error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/blog\/([^/]+?)\/?$/,
						params: (m) => ({ slug: d(m[1])}),
						a: ["src/routes/$layout.svelte", "src/routes/blog/[slug].svelte"],
						b: ["src/routes/$error.svelte"]
					}
	]
};

// this looks redundant, but the indirection allows us to access
// named imports without triggering Rollup's missing import detection
const get_hooks = hooks => ({
	getSession: hooks.getSession || (() => ({})),
	handle: hooks.handle || (({ request, render }) => render(request))
});

const module_lookup = {
	"src/routes/$layout.svelte": () => import("..\\..\\src\\routes\\$layout.svelte"),"src/routes/$error.svelte": () => import("..\\..\\src\\routes\\$error.svelte"),"src/routes/index.svelte": () => import("..\\..\\src\\routes\\index.svelte"),"src/routes/works.svelte": () => import("..\\..\\src\\routes\\works.svelte"),"src/routes/blog/index.svelte": () => import("..\\..\\src\\routes\\blog\\index.svelte"),"src/routes/blog/[slug].svelte": () => import("..\\..\\src\\routes\\blog\\[slug].svelte")
};

const metadata_lookup = {"src/routes/$layout.svelte":{"entry":"/static/_app/pages/$layout.svelte-2ca9dcad.js","css":["/static/_app/assets/pages/$layout.svelte-f37bb926.css"],"js":["/static/_app/pages/$layout.svelte-2ca9dcad.js","/static/_app/chunks/vendor-611e31f7.js","/static/_app/chunks/theme.store-3bdb777c.js","/static/_app/chunks/Icon-5a70e769.js"],"styles":null},"src/routes/$error.svelte":{"entry":"/static/_app/pages/$error.svelte-7fbdd930.js","css":["/static/_app/assets/pages/$error.svelte-8204b64c.css"],"js":["/static/_app/pages/$error.svelte-7fbdd930.js","/static/_app/chunks/vendor-611e31f7.js","/static/_app/chunks/fade-0e7e6119.js"],"styles":null},"src/routes/index.svelte":{"entry":"/static/_app/pages/index.svelte-e7f2ce19.js","css":["/static/_app/assets/pages/index.svelte-e0c5b8c4.css","/static/_app/assets/BlogList-aee80fd8.css"],"js":["/static/_app/pages/index.svelte-e7f2ce19.js","/static/_app/chunks/preload-helper-9f12a5fd.js","/static/_app/chunks/vendor-611e31f7.js","/static/_app/chunks/fade-0e7e6119.js","/static/_app/chunks/Icon-5a70e769.js","/static/_app/chunks/BlogList-236182a1.js","/static/_app/chunks/format-date-58c32eef.js"],"styles":null},"src/routes/works.svelte":{"entry":"/static/_app/pages/works.svelte-dd391f99.js","css":["/static/_app/assets/pages/works.svelte-7a9a5898.css"],"js":["/static/_app/pages/works.svelte-dd391f99.js","/static/_app/chunks/vendor-611e31f7.js","/static/_app/chunks/fade-0e7e6119.js","/static/_app/chunks/Icon-5a70e769.js"],"styles":null},"src/routes/blog/index.svelte":{"entry":"/static/_app/pages/blog/index.svelte-c0d5a4b0.js","css":["/static/_app/assets/BlogList-aee80fd8.css"],"js":["/static/_app/pages/blog/index.svelte-c0d5a4b0.js","/static/_app/chunks/vendor-611e31f7.js","/static/_app/chunks/fade-0e7e6119.js","/static/_app/chunks/BlogList-236182a1.js","/static/_app/chunks/format-date-58c32eef.js","/static/_app/chunks/Icon-5a70e769.js"],"styles":null},"src/routes/blog/[slug].svelte":{"entry":"/static/_app/pages/blog/[slug].svelte-26c48b65.js","css":["/static/_app/assets/pages/blog/[slug].svelte-53554907.css"],"js":["/static/_app/pages/blog/[slug].svelte-26c48b65.js","/static/_app/chunks/preload-helper-9f12a5fd.js","/static/_app/chunks/vendor-611e31f7.js","/static/_app/chunks/format-date-58c32eef.js","/static/_app/chunks/fade-0e7e6119.js","/static/_app/chunks/theme.store-3bdb777c.js","/static/_app/chunks/Icon-5a70e769.js"],"styles":null}};

async function load_component(file) {
	return {
		module: await module_lookup[file](),
		...metadata_lookup[file]
	};
}

init({ paths: {"base":"/","assets":"/static"} });

export function render(request, {
	prerender
} = {}) {
	const host = request.headers["host"];
	return respond({ ...request, host }, options, { prerender });
}