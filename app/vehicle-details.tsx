import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    Alert,
    Dimensions,
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const VehicleDetailsScreen = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    // Use vehicle data from params if available, fallback to defaults
    let vehicleDetails;
    if (params.vehicle) {
        const vehicleParam = Array.isArray(params.vehicle) ? params.vehicle[0] : params.vehicle;
        vehicleDetails = JSON.parse(vehicleParam);
    } else {
        vehicleDetails = {
            year: '2021',
            make: 'GMC',
            model: 'Yukon Hybrid RWD Touring',
            vin: '4LEG11AK1MU428483',
            fullVin: '4LEG11AK1MU428483',
            mileage: '45,000',
            location: 'New York, NY',
            dealer: 'ABC Motors',
            condition: 'Excellent',
            features: ['4 Door Cab', 'Extended', 'Quad RWD'],
            price: '$28,000',
            listingAmount: '$30,000',
            startDate: 'March 18, 2024',
            endDate: 'February 17, 2025',
            daysSinceStart: '305',
            daysUntilEnd: '28',
            subaru: true,
            photoCount: 20,
            currentPhoto: 1,
            sellerComments: 'Single owner, no accidents, Carfax avail.',
        };
    }

    // Defensive: ensure features is always an array
    const features = Array.isArray(vehicleDetails.features) ? vehicleDetails.features : [];

    let offers;
    let offersCount = 0;
    if (params.offers) {
        const offersParam = Array.isArray(params.offers) ? params.offers[0] : params.offers;
        offers = JSON.parse(offersParam);
        offersCount = Array.isArray(offers) ? offers.length : 0;
    } else {
        offers = [
            { id: 1, amount: '$19,200', dealer: 'Premier Auto', status: 'Pending' },
            { id: 2, amount: '$18,500', dealer: 'City Motors', status: 'Declined' },
        ];
        offersCount = offers.length;
    }

    const highestOffer = offers.length > 0 ? offers[0].amount : '$0';
    const spreadToBook = '92%';

    const [offersModalVisible, setOffersModalVisible] = React.useState(false);

    const handleViewOffers = () => {
        setOffersModalVisible(true);
    };

    const handleEditListing = () => {
        Alert.alert('Edit Listing', 'Editing listing functionality will be implemented here.');
    };

    const handleEditComment = () => {
        Alert.alert('Edit Comment', 'Comment editing functionality will be implemented here.');
    };

    // Get images from params or vehicleDetails
    let images: string[] = [];
    if (params.images) {
        const imagesParam = Array.isArray(params.images) ? params.images[0] : params.images;
        images = JSON.parse(imagesParam);
    } else if (vehicleDetails.images) {
        images = vehicleDetails.images;
    }
    const [currentImage, setCurrentImage] = React.useState(0);
    const screenWidth = Dimensions.get('window').width;

    return (
        <SafeAreaView style={styles.container}>
            {/* Offers Modal */}
            <Modal
                visible={offersModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setOffersModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{offersCount} Offer{offersCount !== 1 ? 's' : ''}</Text>
                            <TouchableOpacity onPress={() => setOffersModalVisible(false)}>
                                <Text style={styles.modalClose}>✕</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={{ maxHeight: 400 }}>
                            {offers.map((offer, idx) => (
                                <View key={offer.id} style={styles.offerCard}>
                                    <View style={styles.offerRow}>
                                        <Text style={styles.offerAmount}>{offer.amount}</Text>
                                    </View>
                                    {offer.comment && (
                                        <Text style={styles.offerComment}>{offer.comment}</Text>
                                    )}
                                    {offer.status === 'Declined' ? (
                                        <View style={styles.declinedRow}>
                                            <Text style={styles.declinedBadge}>Offer Declined</Text>
                                        </View>
                                    ) : (
                                        <View style={styles.offerActionsRow}>
                                            <TouchableOpacity style={styles.declineButton}>
                                                <Text style={styles.declineButtonText}>Decline</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.counterButton}>
                                                <Text style={styles.counterButtonText}>Counter</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    {offer.status !== 'Declined' && (
                                        <TouchableOpacity style={styles.acceptButton}>
                                            <Text style={styles.acceptButtonText}>Accept Offer</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
            <ScrollView style={styles.scrollView}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}>
                        <Text style={styles.backButtonText}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle} numberOfLines={2} ellipsizeMode="tail">
                        {vehicleDetails.year} {vehicleDetails.make} {vehicleDetails.model}
                    </Text>
                </View>

                {/* Subaru Brand Section (moved above image) */}
                {vehicleDetails.subaru && (
                    <View style={styles.subaruBrandContainer}>
                        <Text style={styles.subaruBrandText}>SUBARU</Text>
                        <Text style={styles.subaruBrandSubtext}>OF GWINNETT</Text>
                    </View>
                )}

                {/* Vehicle Image Carousel */}
                <View style={styles.imageContainer}>
                    {images && images.length > 0 ? (
                        <>
                            <Image
                                source={{ uri: images[currentImage] }}
                                style={{ width: screenWidth, height: 300, resizeMode: 'cover' }}
                            />
                            <View style={styles.photoCounter}>
                                <Text style={styles.photoCounterText}>
                                    {currentImage + 1} of {images.length}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
                                {images.map((_, idx) => (
                                    <TouchableOpacity
                                        key={idx}
                                        onPress={() => setCurrentImage(idx)}
                                        style={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: 5,
                                            backgroundColor: idx === currentImage ? '#007AFF' : '#ccc',
                                            marginHorizontal: 4,
                                        }}
                                    />
                                ))}
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', top: '50%', width: '100%' }}>
                                <TouchableOpacity
                                    onPress={() => setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                                    style={{ padding: 16 }}
                                >
                                    <Text style={{ fontSize: 24, color: '#fff', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 20 }}>‹</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                                    style={{ padding: 16 }}
                                >
                                    <Text style={{ fontSize: 24, color: '#fff', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 20 }}>›</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <Text style={styles.imageText}>🚗</Text>
                        </View>
                    )}
                </View>

                {/* Edit Listing Button */}
                <View style={styles.editListingContainer}>
                    <TouchableOpacity style={styles.editListingButton} onPress={handleEditListing}>
                        <Text style={styles.editListingButtonText}>Edit Listing</Text>
                    </TouchableOpacity>
                </View>

                {/* Vehicle Info */}
                <View style={styles.infoContainer}>
                    <View style={styles.featuresContainer}>
                        <Text style={styles.featuresText}>
                            {features.length > 0 ? features.join('; ') : 'No features listed'}
                        </Text>
                    </View>

                    {/* Modern VIN Row */}
                    <View style={styles.vinRow}>
                        <Text style={[styles.vinText, styles.vinTextBold]}>{vehicleDetails.fullVin || vehicleDetails.vin}</Text>
                        <Text style={styles.vinDash}>-</Text>
                        <Text style={[styles.vinText, styles.vinTextBold]}>8912LSSSTVJU</Text>
                        <View style={styles.eyeCircle}>
                            <Text style={styles.eyeIcon}>👁️</Text>
                        </View>
                    </View>
                </View>

                {/* Offers Section */}
                <View style={styles.offersSection}>
                    <View style={styles.offersSectionHeader}>
                        <Text style={styles.offersTitle}>Offers</Text>
                        <View style={styles.offerBadge}>
                            <Text style={styles.offerBadgeText}>{offersCount}</Text>
                        </View>
                    </View>

                    <View style={styles.offersContent}>
                        <View style={styles.offersRow}>
                            <Text style={styles.offersLabel}>Highest Offer</Text>
                            <Text style={styles.offersValue}>{highestOffer}</Text>
                        </View>
                        <View style={styles.offersRow}>
                            <View style={styles.spreadContainer}>
                                <Text style={styles.offersLabel}>📖 Spread To Book</Text>
                                <View style={styles.offersIcon}>
                            <Text style={styles.offersIconText}>?</Text>
                        </View>
                            </View>
                            <Text style={styles.offersValue}>{spreadToBook}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.openOffersButton} onPress={handleViewOffers}>
                        <Text style={styles.openOffersButtonText}>Open Offers</Text>
                    </TouchableOpacity>
                </View>

                {/* Seller Comments Section */}
                <View style={styles.sellerCommentsSection}>
                    <View style={styles.sellerCommentsHeader}>
                        <Text style={styles.sellerCommentsTitle}>Seller Comments</Text>
                        <TouchableOpacity onPress={handleEditComment}>
                            <Text style={styles.editCommentsButton}>—</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.sellerCommentsText}>
                        {vehicleDetails.sellerComments || 'No comments provided.'}
                    </Text>

                    <TouchableOpacity style={styles.editCommentButton} onPress={handleEditComment}>
                        <Text style={styles.editCommentButtonText}>Edit Comment</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollView: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    backButton: {
        marginRight: 15,
    },
    backButtonText: {
        fontSize: 24,
        color: '#007AFF',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    imageContainer: {
        position: 'relative',
        height: 300,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageText: {
        fontSize: 120,
    },
    photoCounter: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    photoCounterText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '500',
    },
    editListingContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    editListingButton: {
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#007AFF',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    editListingButtonText: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: '600',
    },
    infoContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    featuresContainer: {
        marginBottom: 10,
    },
    featuresText: {
        fontSize: 14,
        color: '#999',
    },
    vinRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    vinTextBold: {
        fontWeight: 'bold',
        marginRight: 4,
    },
    vinDash: {
        fontSize: 18,
        color: '#999',
        marginHorizontal: 2,
    },
    eyeCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#FFD600',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    eyeIcon: {
        fontSize: 18,
        color: '#333',
        transform: [{ scaleX: -1 }],
    },
    certificationBadge: {
        marginRight: 8,
    },
    certificationText: {
        fontSize: 16,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 14,
        color: '#333',
    },
    offersSection: {
        backgroundColor: '#f8f8f8',
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
    },
    offersSectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    offersTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 8,
    },
    offersIcon: {
        backgroundColor: '#007AFF',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    offersIconText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    offersContent: {
        marginBottom: 20,
    },
    offersRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    spreadContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    offersLabel: {
        fontSize: 16,
        color: '#666',
        marginRight: 5,
    },
    infoIcon: {
        marginLeft: 5,
    },
    infoIconText: {
        fontSize: 14,
    },
    offersValue: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
    },
    openOffersButton: {
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#007AFF',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    openOffersButtonText: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: '600',
    },
    sellerCommentsSection: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    sellerCommentsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sellerCommentsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    editCommentsButton: {
        fontSize: 24,
        color: '#007AFF',
    },
    sellerCommentsText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
        marginBottom: 20,
    },
    editCommentButton: {
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#007AFF',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    editCommentButtonText: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: '600',
    },
    subaruBrandContainer: {
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 0,
    },
    subaruBrandText: {
        color: '#007AFF',
        fontSize: 15,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    subaruBrandSubtext: {
        color: '#007AFF',
        fontSize: 11,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        marginTop: -2,
    },
    vinText: {
        fontSize: 16,
        color: '#333',
    },
    offerBadge: {
        backgroundColor: '#007AFF',
        borderRadius: 10,
        minWidth: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
        marginLeft: 4,
    },
    offerBadgeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 18,
        width: '90%',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    modalClose: {
        fontSize: 22,
        color: '#888',
        padding: 4,
    },
    offerCard: {
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#fafbfc',
    },
    offerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    offerAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222',
    },
    offerComment: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    offerActionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    declineButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#007AFF',
        borderRadius: 8,
        paddingVertical: 10,
        marginRight: 8,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    declineButtonText: {
        color: '#007AFF',
        fontWeight: '600',
    },
    counterButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#007AFF',
        borderRadius: 8,
        paddingVertical: 10,
        marginLeft: 8,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    counterButtonText: {
        color: '#007AFF',
        fontWeight: '600',
    },
    acceptButton: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 2,
    },
    acceptButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    declinedRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 2,
    },
    declinedBadge: {
        color: '#b71c1c',
        backgroundColor: '#fff3e0',
        borderWidth: 1,
        borderColor: '#b71c1c',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 4,
        fontWeight: 'bold',
        fontSize: 13,
    },
});

export default VehicleDetailsScreen;
