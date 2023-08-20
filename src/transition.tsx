import { motion } from "framer-motion";

interface TransitionProps {
    OgComponent: React.ComponentType;
  }

const transition = ({ OgComponent }: TransitionProps) => {
    const TransitionedComponent = () => {
        return (
            <div>
                <OgComponent />
                <motion.div
                    className="fixed top-0 left-0 w-full h-screen bg-gray-800 transform origin-bottom"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.div
                    className="fixed top-0 left-0 w-full h-screen bg-gray-800 transform origin-top"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />
            </div>
        );
    };

    return TransitionedComponent;
};

export default transition;
