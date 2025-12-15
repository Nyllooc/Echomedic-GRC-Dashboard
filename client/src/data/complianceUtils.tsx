import React from "react";
import { Icons } from "../components/tsx/Icons";

export const getStatusConfig = (status: string) => {
    switch (status) {
        case "Compliant":
            return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
        case "Partial":
            return "bg-amber-500/10 text-amber-500 border-amber-500/20";
        case "Non-Compliant":
            return "bg-red-500/10 text-red-500 border-red-500/20";
        default:
            return "bg-slate-700 text-slate-300";
    }
};

export const getStatusIcon = (status: string) => {
    switch (status) {
        case "Compliant": return <Icons.CheckCircle />;
        case "Partial": return <Icons.ExclamationCircle />;
        case "Non-Compliant": return <Icons.XCircle />;
        default: return <div className="w-6 h-6 rounded-full bg-slate-700" />;
    }
};

export const getStatusBg = (status: string) => {
    switch (status) {
        case "Compliant": return "bg-emerald-500/10";
        case "Partial": return "bg-amber-500/10";
        case "Non-Compliant": return "bg-red-500/10";
        default: return "bg-slate-700";
    }
}