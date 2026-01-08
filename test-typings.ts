// This file ensures the test compiler picks up the ambient declaration
// for the testing entrypoint if the package exports aren't being resolved
// correctly by the build tooling.
declare module "@angular/platform-browser-dynamic/testing";
