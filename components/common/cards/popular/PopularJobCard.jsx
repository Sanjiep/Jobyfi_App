import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./popularjobcard.style";
import { checkImageURL } from "../../../../utils"; // Verify this path and the export in utils/index.js or utils/index.jsx

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  // Guard clause for invalid item
  if (!item) {
    console.warn("PopularJobCard: item prop is undefined or null.");
    return null;
  }

  const apiLogoUrl = item?.employer_logo; // Use optional chaining here too for safety

  // --- Start Detailed Logging ---
  console.log(`--------------------------------`);
  console.log(`Job Title: ${item.job_title ? item.job_title.substring(0,30) : 'N/A'}`);
  console.log(`1. API employer_logo (apiLogoUrl):`, apiLogoUrl);
  console.log(`2. typeof checkImageURL:`, typeof checkImageURL);

  let isUrlConsideredValidByFunction = false;
  if (typeof checkImageURL === 'function') {
    isUrlConsideredValidByFunction = checkImageURL(apiLogoUrl);
    console.log(`3. Result of checkImageURL(apiLogoUrl):`, isUrlConsideredValidByFunction);
  } else {
    console.warn(`   WARNING: checkImageURL is not a function! Import might have failed or it's not exported correctly.`);
  }
  // --- End Detailed Logging ---

  // This is the effective condition being used in your Image source
  const shouldUseApiLogo = typeof checkImageURL === 'function' && checkImageURL(apiLogoUrl);
  // console.log(`4. Final decision - shouldUseApiLogo:`, shouldUseApiLogo);


  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={() => handleCardPress && handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
        <Image
          source={{
            uri: shouldUseApiLogo // Use the clearly determined boolean
              ? apiLogoUrl // Use the stored apiLogoUrl
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode="contain"
          style={styles.logoImage}
          alt={item.employer_name || "Company Logo"}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {item.employer_name}
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
          {item.job_title}
        </Text>
        <View style={styles.infoWrapper}>
          <Text style={styles.publisher(selectedJob, item)}>
            {item?.job_publisher} -
          </Text>
          <Text style={styles.location}> {item.job_country}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;