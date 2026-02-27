'use server';

import { db } from "@/lib/db";

export type Story = {
    ESS_CODE: string;
    Segment_Name: string;
    Produced_By: string;
    Story_Theme: string;
    Approval_Status: string;
    Upload_Date: string;
    Youtube_Link: string;
    Story_Synopsis: string;
    Story_Summary: string;
    Ministry_Category: string;
};

export async function searchStories(formData: FormData) {
    const segmentName = formData.get("segmentName") as string;
    const producer = formData.get("producer") as string;
    const theme = formData.get("theme") as string;
    const status = formData.get("status") as string;
    const essCode = formData.get("essCode") as string;
    const uploadDate = formData.get("uploadDate") as string;
    const youtubeLink = formData.get("youtubeLink") as string;
    const storySynopsis = formData.get("storySynopsis") as string;
    const storySummary = formData.get("storySummary") as string;

    let query = `
        SELECT 
            e.ESS_CODE, 
            e.Segment_Name, 
            e.Produced_By, 
            ss.Story_Theme, 
            e.Approval_Status, 
            s.UPLOAD_DATE as CreatedDate,
            y.Youtube_Links,
            e.Segment_Synopsis,
            ss."Story Summary" as Story_Summary,
            e.Ministry_Category
        FROM ESS_EssSF e
        LEFT JOIN ESS_BOX_EssBox s ON e.ESS_CODE = s.ESS_CODE
        LEFT JOIN StoryData_Story_sql ss ON e.ESS_CODE = ss.ESS_CODE
        LEFT JOIN YT_tbl_CBNYT_sql y ON e.ESS_CODE = y.ESS_CODE
        WHERE 1=1
    `;
    const args: any[] = [];

    if (segmentName) {
        query += " AND e.Segment_Name LIKE ?";
        args.push(`%${segmentName}%`);
    }

    if (producer) {
        query += " AND e.Produced_By LIKE ?";
        args.push(`%${producer}%`);
    }

    if (theme) {
        query += " AND ss.Story_Theme LIKE ?";
        args.push(`%${theme}%`);
    }

    if (status && status !== "All") {
        query += " AND e.Approval_Status = ?";
        args.push(status);
    }

    if (essCode) {
        query += " AND e.ESS_CODE LIKE ?";
        args.push(`%${essCode}%`);
    }

    if (uploadDate) {
        query += " AND s.UPLOAD_DATE LIKE ?";
        args.push(`%${uploadDate}%`);
    }

    if (youtubeLink) {
        query += " AND y.Youtube_Links LIKE ?";
        args.push(`%${youtubeLink}%`);
    }

    if (storySynopsis) {
        query += " AND e.Segment_Synopsis LIKE ?";
        args.push(`%${storySynopsis}%`);
    }

    if (storySummary) {
        query += " AND ss.\"Story Summary\" LIKE ?";
        args.push(`%${storySummary}%`);
    }

    query += " LIMIT 50";

    try {
        const rs = await db.execute({ sql: query, args });
        const stories: Story[] = rs.rows.map((row) => ({
            ESS_CODE: String(row.ESS_CODE || ""),
            Segment_Name: String(row.Segment_Name || ""),
            Produced_By: String(row.Produced_By || ""),
            Story_Theme: String(row.Story_Theme || ""),
            Approval_Status: String(row.Approval_Status || ""),
            Upload_Date: String(row.CreatedDate || ""),
            Youtube_Link: String(row.Youtube_Links || ""),
            Story_Synopsis: String(row.Segment_Synopsis || ""),
            Story_Summary: String(row.Story_Summary || ""),
            Ministry_Category: String(row.Ministry_Category || ""),
        }));
        return stories;
    } catch (e) {
        console.error("Search error:", e);
        return [];
    }
}
