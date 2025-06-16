import React from "react";
import { View, Text, Image } from "react-native";

import { checkImageURL } from "@/utils";
import { icons } from "@/constants";

import styles from "./company.style";

const Company = ({ companyLogo, jobTitle, companyName, location }) => {
  
  const shouldUseApiLogo = typeof checkImageURL === 'function' && checkImageURL(companyLogo);
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          source={{
            uri: shouldUseApiLogo // Use the clearly determined boolean
              ? companyLogo // Use the stored apiLogoUrl
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg", // Use the clearly determined boolean
          }}
          accessibilityLabel={companyName ? `${companyName} logo` : "Company logo"} // Good for accessibility
          style={styles.logoImage}
        />
      </View>
      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
      </View>
      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{companyName} / </Text>
        <View style={styles.locationBox}>
          <Image
            source={icons.location}
            resizeMode="contain"
            style={styles.locationImage}
          />
          <Text style={styles.locationText}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

export default Company;
