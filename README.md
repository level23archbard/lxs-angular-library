# LXS Angular Library

This project serves as a library repository for various angular modules I like to reuse. Its intended use is through github's package repository. Each module will be distributable as its own package, and can be explored individually [here](https://github.com/level23archbard/lxs-angular-library/packages).

## Projects

Within this repo, code for each package can be found within the ./projects directory. Each package is contained in its own directory name.

Package versions will strictly follow semver with the following understanding:
- Any major version 1 or greater is a stable, reliable package with full automated validation covered. It should be live in some other stable, reliable depender. Only bumps to major versions may change backwards-facing behaviors, other than bugfixes. Bumps to major or minor versions may add behaviors. This package may only depend on other stable packages within the repository.
- Any major version 0 with a minor version 1 or greater is a functional package with full automated validation covered. Only bumps to minor versions may change backwards-facing behaviors, other than bugfixes. Only bumps to minor versions may add behaviors. This package may only depend on other functional or stable packages within the repository.
- Any major version 0 minor version 0 is considered a developing package with no automated validation guarantees. Any change may occur at any time. This package may depend on any other package within this repository.

To update a package, follow these steps:
1. Start by modifying the code within the package's src/ directory. Public facing code should be exposed via the public-api.ts file. Use the testing app in the root of this repo and unit tests to verify functionality.
2. To dry-run the package, run these steps in the root directory:
  1. `ng build `PACKAGE_NAME` --configuration production`
  2. `cd dist/`PACKAGE_NAME
  3. `npm pack`
3. If each of these three steps succeed, then it is ready to deploy. Bump the version number of the package appropriately, and commit and push all code.
4. Re-run the steps in (2), as well as:
  - `npm publish`
  - Please note that proper permissions are of course required to publish a package!
5. Finally, be sure to update the package's version for the lxs-angular-library project itself in the root level package.json file, then run `npm install` to populate it. These versions should always be exact and should always match the latest version of each package. Commit and push this!

To create a new package altogether, follow these steps:
1. Run `ng g library `PACKAGE_NAME to create a new package skeleton. Update the source code to a base configuration, and the public-api.ts and README.md files appropriately, and commit and push the progress. Optionally update the testing app as well.
2. Modify the package.json file in the package directory accordingly:
  1. Update the "name" field of the package to have the correct scope, "`@level23archbard/`PACKAGE_NAME"
  2. Add a "repository" object to the package with the key "type" as the string "git" and the key "url" as the string "git://github.com/level23archbard/lxs-angular-library.git".
  3. Ensure dependencies are appropriate. All lxs-angular-library dependencies MUST be listed in the "dependencies" array, not "peerDependencies"! Other dependencies such as angular dependencies should most likely be "peerDependencies"!
3. Modify the ng-package.json file, adding this key: `"allowedNonPeerDependencies": ["@level23archbard/*"]`. Include others carefully!
4. Add the .npmrc file to the package directory, and populate it with: `registry=https://npm.pkg.github.com/level23archbard`
5. Deploy it following the steps in the "updating" section, and be sure to add the package to the root level package.json dependencies!

## Test App

This repo also contains a basic angular app in ./src for the purpose of testing the components locally. Run `ng serve` to run the app.

At this time, no organization is planned for the test app. It may be reserved to be deployed to github pages as a way to view the library modules directly, at a later time.
