import * as views from "packages/rxt-public/views/rxtViews";
export function viewRouter(req=request) {
    if(req.startsWith("/")) {
        return new Response(views[req.substring(1)]);
    }
};