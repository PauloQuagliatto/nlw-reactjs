import '../styles/logout-button.scss'


export const LogOutButton = ({ ...props }) => {

 return(
   <button 
   className={`logout-button`}
   {...props} />
 ) 
}