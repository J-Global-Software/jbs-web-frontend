"use client";
import { useEffect, type ReactNode } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

type Props = {
	children: ReactNode;
};

const Aoscompo = ({ children }: Props) => {
	useEffect(() => {
		AOS.init({
			duration: 800,
			once: false,
		});
	}, []);

	return <div>{children}</div>;
};

export default Aoscompo;
