FROM microsoft/dotnet:2.2-aspnetcore-runtime

WORKDIR /jak-daleko-vozilla-webapp

COPY . .

CMD ASPNETCORE_URLS=http://*:$PORT dotnet jak-daleko-vozilla-webapp.dll.dll