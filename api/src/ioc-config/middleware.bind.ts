import { interfaces } from "inversify";

export default async function bindMiddlewares(
    container: interfaces.Container
) {
   const middlewares:any[] = [
   ];
   middlewares.forEach(middleware => {
        container.bind(middleware.type).to(middleware.entity);
   });
}
