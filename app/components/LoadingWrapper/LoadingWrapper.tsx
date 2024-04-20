const LoadingWrapper=({children,isLoading})=>{
    
    return isLoading?'Loading ....':children;
};
export default LoadingWrapper