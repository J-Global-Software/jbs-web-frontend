"use client";

import { useMemo } from "react";

// --- Types ---
export type WorkshopSession = {
	title: string;
	content: string[];
	dates: { id: string; date: string; startTime: string }[];
};

export interface Workshop {
	title: string;
	subtitle: string;
	image: string;
	purpose: string[];
	participants: string;
	objectives: string[];
	language: string;
	sessions: WorkshopSession[];
	speakers: string[];
}

interface WorkshopDetailProps {
	workshop: Workshop;
	code: string;
	levelLabel?: boolean;
	showSubtitle?: boolean;
}

export default function WorkshopDetail({ workshop, showSubtitle = true }: WorkshopDetailProps) {
	/**
	 * LOGIC CHECK:
	 * If the freeze happens here, the Regex is too complex for the mobile CPU.
	 */
	const processed = useMemo(() => {
		const cleanList = (val: string | string[] | undefined): string[] => {
			if (!val) return [];
			const arr = Array.isArray(val) ? val : val.split(/(?=[●・•○■▪➤])|(?=\d+\.)/);
			return arr.map((s) => s.replace(/^[●・•○■▪➤\s]+|^\d+[\.\s]*/, "").trim()).filter((t) => t.length > 0 && !t.toLowerCase().includes("by the end of the workshop"));
		};

		return {
			purpose: cleanList(workshop.purpose),
			objectives: cleanList(workshop.objectives),
			participants: cleanList(workshop.participants),
			language: cleanList(workshop.language),
			speakers: (workshop.speakers || []).map((s) => s.replace(/^[•●・*-]|\d+\./, "").trim()).filter(Boolean),
		};
	}, [workshop]);

	return (
		<div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", lineHeight: "1.6" }}>
			<header style={{ borderBottom: "2px solid black", marginBottom: "20px" }}>
				<h1>{workshop.title}</h1>
				{showSubtitle && (
					<p>
						<em>{workshop.subtitle}</em>
					</p>
				)}
			</header>

			<section>
				<h2>Quick Stats</h2>
				<p>
					<strong>Participants:</strong> {processed.participants[0] || "N/A"}
				</p>
				<p>
					<strong>Language:</strong> {processed.language[0] || "N/A"}
				</p>
			</section>

			<section>
				<h2>Program Purpose ({processed.purpose.length} items)</h2>
				<ol>
					{processed.purpose.map((item, i) => (
						<li key={i} style={{ marginBottom: "10px" }}>
							{item}
						</li>
					))}
				</ol>
			</section>

			<section>
				<h2>Learning Objectives</h2>
				<ul>
					{processed.objectives.map((obj, i) => (
						<li key={i}>{obj}</li>
					))}
				</ul>
			</section>

			<section>
				<h2>Speakers</h2>
				<ul>
					{processed.speakers.map((name, i) => (
						<li key={i}>{name}</li>
					))}
				</ul>
			</section>

			<section style={{ marginTop: "40px", padding: "20px", background: "#eee" }}>
				<h2>Sessions Data Check</h2>
				<pre>{JSON.stringify(workshop.sessions, null, 2)}</pre>
			</section>

			<footer style={{ marginTop: "50px", fontSize: "12px" }}>End of Diagnostic Page</footer>
		</div>
	);
}
