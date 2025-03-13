"use client";
import Modal from "@/components/modals/Modal";
import FitlerModelTable from "@/components/table/model_table/FilterModelTable";

export default function BikesPanel() {
    return (
        <>
            <FitlerModelTable/>
            <Modal/>
        </>
    );
}
