import { motion } from 'framer-motion'
export default function Card({children,className=''}){return <motion.section className={`card ${className}`} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.42}} whileHover={{y:-2}}>{children}</motion.section>}
