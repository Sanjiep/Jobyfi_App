import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./nearbyjobcard.style";
import { checkImageURL } from "../../../../utils";

const NearbyJobCard = ({job, handleNavigate }) => {
  // Guard clause for invalid job
  if (!job) {
    console.warn("PopularJobCard: job prop is undefined or null.");
    return null;
  }

  const apiLogoUrl = job?.employer_logo;

  let isUrlConsideredValidByFunction = false;
  if (typeof checkImageURL === 'function') {
    isUrlConsideredValidByFunction = checkImageURL(apiLogoUrl);
  } else {
    console.warn(`   WARNING: checkImageURL is not a function! Import might have failed or it's not exported correctly.`);
  }
  
  const shouldUseApiLogo = typeof checkImageURL === 'function' && checkImageURL(apiLogoUrl);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate}
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: shouldUseApiLogo // Use the clearly determined boolean
              ? apiLogoUrl // Use the stored apiLogoUrl
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode="contain"
          style={styles.logoImage}
          alt={job.employer_name || "Company Logo"}
        />
      </TouchableOpacity>
  

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {job.job_title}
        </Text>
        <Text style = {styles.jobType}>
          {job.job_employment_type || "Full-time"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;