import { NextResponse, type NextRequest } from "next/server";
import { createClient } from '@supabase/supabase-js';
import readUserSession from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserRole } from "./lib/authActions/actions";

export async function middleware(request: NextRequest) {
    //console.log('Middleware hit: Checking authentication status.');
    const sessionData = await readUserSession()
    //console.log("In middleware here.",sessionData)
    if (!sessionData.data || !sessionData.data.user){
        //console.log("HERE IN NO SESSION DATA REDIRECT")
        //console.log("no data",sessionData)
        return new NextResponse("Page not found", { status: 404 });
      }

    const roleRequirements = {
        "/dashboard/entry": "researcher",
        "/dashboard/delete/event": "researcher",
        "/dashboard/delete/observation": "researcher",
        "/dashboard/edit": "researcher",
    };
    const path = request.nextUrl.pathname;
    const requiredRoleKey = Object.keys(roleRequirements).find(key => path.startsWith(key));

    if (requiredRoleKey) {
        //console.log("User ID here?", sessionData.data.user.id);
        const {role,error } = await getUserRole(sessionData.data.user.id);
        console.log("Role here", role);

        // If role does not match required role redirect
        if (role !== roleRequirements[requiredRoleKey]) {
            console.log(`Access denied: User role ${role.role} is not authorized for ${path}`);
            return new NextResponse("Page not found", { status: 404 });
        }
    }

    //console.log('User authenticated, proceeding with request.');
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",  // Apply middleware to all routes under the /dashboard path
        "/dashboard/entry", //Specificl URL for entry page
        "/dashboard/delete/event/:path*", //apply to anything with /delete
        "/dashboard/delete/observation/:path*",
        "/dashboard/edit/:path*",
    ],
};